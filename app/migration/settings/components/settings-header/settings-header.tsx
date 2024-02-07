import { TSettingsHeader } from "app/migration/settings/components/settings-header/settings-header.types";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function SettingsHeader({ icon, title, subtitle, children }: TSettingsHeader.Props) {
  return (
    <Card background="base">
      <Flex className="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <Flex direction="col" className="gap-2">
          <Flex alignItems="center" className="gap-2">
            {icon ? <Icon remixName={icon} size={24} /> : null}
            <Typography variant="title-m" translate={{ token: title }} />
          </Flex>

          <Typography variant="body-s" translate={{ token: subtitle }} className="text-spaceBlue-200" />
        </Flex>

        <div>{children}</div>
      </Flex>
    </Card>
  );
}