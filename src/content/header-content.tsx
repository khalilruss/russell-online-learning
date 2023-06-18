export type HeaderItem = {
  id: string | HeaderItem[];
  label: string;
};

export const aboutMenuItems: HeaderItem[] = [
  {
    label: "About Russell Online Learning",
    id: "aboutROL",
  },
  {
    label: "About Me",
    id: "aboutMe",
  },
];

export const headerButtons: HeaderItem[] = [
  {
    label: "About",
    id: aboutMenuItems,
  },
  {
    label: "My Accomplishments",
    id: "accomplishments",
  },
  {
    label: "My Ethos",
    id: "ethos",
  },
  {
    label: "Testimonials",
    id: "testimonials",
  },
  {
    label: "Sessions and Prices",
    id: "sessionsAndPrices",
  },
  {
    label: "Contact Me",
    id: "contact",
  },
];
