import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

import PaymentForm from "./View";

export default {
  title: "PaymentForm",
  component: PaymentForm,
} as ComponentMeta<typeof PaymentForm>;

const Template: ComponentStory<typeof PaymentForm> = args => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <PaymentForm {...args} />
    </FormProvider>
  );
};

export const Default = Template.bind({});

Default.args = {
  loading: false,
  budget: { initialAmount: 5000, remainingAmount: 3000 },
  onWorkEstimationChange: () => {
    return;
  },
  onContributorLoginChange: () => {
    return;
  },
  validateContributorLogin: () => {
    return true;
  },
};

Default.parameters = {
  backgrounds: {
    default: "space",
  },
};