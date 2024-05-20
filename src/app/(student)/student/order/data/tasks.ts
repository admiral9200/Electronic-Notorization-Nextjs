import { InstitutionType } from "@prisma/client";

export const tasks = [
  {
    id: 1,
    logo: "logo_url",
    name: "University 01",
    location: "Location 01",
    genre: InstitutionType.UNIVERSITY,
    users: 100
  },
  {
    id: 2,
    logo: "logo_url",
    name: "University 02",
    location: "Location 02",
    genre: InstitutionType.COLLEGE,
    users: 100
  },
  {
    id: 3,
    logo: "logo_url",
    name: "University 03",
    location: "Location 03",
    genre: InstitutionType.SCHOOL,
    users: 101
  },
]
