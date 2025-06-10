import { type Meta, type StoryObj } from "@storybook/react";

import { Loader2 } from "lucide-react";
import { Button } from "../components/button";
import { DummyDecorator } from "../lib/storybook";

const meta: Meta = {
  title: "Examples/Button",
  component: Button,
  decorators: [
    (Story) => {
      return DummyDecorator({
        Story: <Story />,
        className: "h-full min-h-fit lg:max-w-full",
      });
    },
  ],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onClick: { action: "clicked" },
    variant: {
      control: {
        type: "select",
      },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
        "disabled",
      ],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["default", "sm", "lg", "icon"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "Link",
    variant: "link",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
};

export const Icon: Story = {
  args: {
    children: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    ),
    size: "icon",
  },
};

export const WithIconBefore: Story = {
  args: {
    children: (
      <>
        <svg
          className="h-6 w-6 -ml-2 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>With Icon</span>
      </>
    ),
  },
};

export const WithIconAfter: Story = {
  args: {
    children: (
      <>
        <span>With Icon</span>
        <svg
          className="h-6 w-6 ml-2 -mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "disabled",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: <Loader2 className="h-6 w-6 animate-spin" />,
    disabled: true,
  },
};

export const AsChild: Story = {
  args: {
    children: (
      <a
        href="#"
        className="flex items-center"
        onClick={(e) => e.preventDefault()}
      >
        <span>As Link</span>
      </a>
    ),
  },
};
