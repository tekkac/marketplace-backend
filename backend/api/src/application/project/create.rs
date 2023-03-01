use std::sync::Arc;

use anyhow::Result;
use domain::{DomainError, Event, Project, ProjectId, Publisher};
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

use crate::{
	domain::{ProjectDetails, Publishable},
	infrastructure::database::ProjectDetailsRepository,
	presentation::http::dto::NonEmptyTrimmedString,
};

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_details_repository: ProjectDetailsRepository,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_details_repository: ProjectDetailsRepository,
	) -> Self {
		Self {
			event_publisher,
			project_details_repository,
		}
	}

	#[allow(clippy::too_many_arguments)]
	#[instrument(skip(self))]
	pub async fn create(
		&self,
		name: NonEmptyTrimmedString,
		short_description: NonEmptyTrimmedString,
		long_description: NonEmptyTrimmedString,
		telegram_link: Option<String>,
		logo_url: Option<String>,
	) -> Result<ProjectId, DomainError> {
		let project_id = ProjectId::new();

		Project::create(project_id)
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		self.project_details_repository.upsert(&ProjectDetails::new(
			project_id,
			name.into(),
			telegram_link,
			logo_url,
			short_description.into(),
			long_description.into(),
		))?;

		Ok(project_id)
	}
}
