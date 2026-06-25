import { create } from 'zustand';
export interface CvItem {
  name: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  city: string;
  postalCode: string;
  nationality: string;
  website: string;
}

export interface Experience {
  company: string;
  position: string;
  city: string;
  startMonth: number | null;
  startYear: number | null;
  endMonth: number | null;
  endYear: number | null;
  description: string;
}

export interface Education {
  degree: string;
  fieldOfStudy: string;
  institution: string;
  isCurrent: boolean;
  startMonth: number | null;
  startYear: number | null;
  endMonth: number | null;
  endYear: number | null;
  description: string;
}

export interface CvState {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];

  skills: CvItem[];
  certificates: CvItem[];
  courses: CvItem[];

  languages: LanguageItem[];
  hobby: string;
  generalDescription: string;
  photo: string | undefined;
}

export interface CvActions {
  setExperience: (experience: Experience[]) => void;
  addExperience: (exp: Experience) => void;
  removeExperience: (index: number) => void;

  setEducation: (education: Education[]) => void;
  addEducation: (edu: Education) => void;
  removeEducation: (index: number) => void;

  setPersonalInfo: (personalInfo: PersonalInfo) => void;

  addSkill: (name: string) => void;
  removeSkill: (index: number) => void;

  addLanguage: (name: string, level: string) => void;
  removeLanguage: (index: number) => void;

  addCertificate: (name: string) => void;
  removeCertificate: (index: number) => void;

  addCourse: (name: string) => void;
  removeCourse: (index: number) => void;

  setHobby: (hobby: string) => void;
  setGeneralDescription: (desc: string) => void;
  setPhoto: (photo: string | undefined) => void;

  resetCvStore: () => void;
}

interface CvStore extends CvState {
  actions: CvActions;
}

const initialCvState: CvState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    city: '',
    postalCode: '',
    nationality: '',
    website: '',
  },
  education: [],
  experience: [],
  skills: [],
  languages: [],
  certificates: [],
  courses: [],
  hobby: '',
  generalDescription: '',
  photo: undefined,
};

function removeByIndex<T>(arr: T[], index: number): T[] {
  return arr.filter((_, i) => i !== index);
}

export const useCvStore = create<CvStore>((set) => ({
  ...initialCvState,

  actions: {
    setExperience: (experience) => set({ experience }),
    addExperience: (exp) =>
      set((state) => ({
        experience: [...state.experience, exp],
      })),
    removeExperience: (index) =>
      set((state) => ({ experience: removeByIndex(state.experience, index) })),

    setEducation: (education) => set({ education }),
    addEducation: (edu) =>
      set((state) => ({
        education: [...state.education, edu],
      })),
    removeEducation: (index) =>
      set((state) => ({ education: removeByIndex(state.education, index) })),

    setPersonalInfo: (personalInfo) => set({ personalInfo }),

    addSkill: (name) =>
      set((state) => ({ skills: [...state.skills, { name }] })),
    removeSkill: (index) =>
      set((state) => ({ skills: removeByIndex(state.skills, index) })),

    addCertificate: (name) =>
      set((state) => ({ certificates: [...state.certificates, { name }] })),
    removeCertificate: (index) =>
      set((state) => ({
        certificates: removeByIndex(state.certificates, index),
      })),

    addCourse: (name) =>
      set((state) => ({ courses: [...state.courses, { name }] })),
    removeCourse: (index) =>
      set((state) => ({ courses: removeByIndex(state.courses, index) })),

    addLanguage: (name, level) =>
      set((state) => ({
        languages: [...state.languages, { name, level }],
      })),
    removeLanguage: (index) =>
      set((state) => ({ languages: removeByIndex(state.languages, index) })),

    setHobby: (hobby) => set({ hobby }),
    setGeneralDescription: (generalDescription) => set({ generalDescription }),
    setPhoto: (photo) => set({ photo }),

    resetCvStore: () => set(initialCvState),
  },
}));
