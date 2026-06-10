import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
export interface CvItem {
  id: string;
  name: string;
}

export interface LanguageItem {
  id: string;
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
  id: string;
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
  id: string;
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
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  removeExperience: (id: string) => void;

  setEducation: (education: Education[]) => void;
  addEducation: (edu: Omit<Education, 'id'>) => void;
  removeEducation: (id: string) => void;

  setPersonalInfo: (personalInfo: PersonalInfo) => void;

  addSkill: (name: string) => void;
  removeSkill: (id: string) => void;

  addLanguage: (name: string, level: string) => void;
  removeLanguage: (id: string) => void;

  addCertificate: (name: string) => void;
  removeCertificate: (id: string) => void;

  addCourse: (name: string) => void;
  removeCourse: (id: string) => void;

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

function removeItem<T extends { id: string }>(arr: T[], id: string): T[] {
  return arr.filter((item) => item.id !== id);
}

function addItem(arr: CvItem[], name: string): CvItem[] {
  return [...arr, { id: globalThis.crypto?.randomUUID?.() ?? uuidv4(), name }];
}

export const useCvStore = create<CvStore>((set) => ({
  ...initialCvState,

  actions: {
    setExperience: (experience) => set({ experience }),
    addExperience: (exp) =>
      set((state) => ({
        experience: [...state.experience, { ...exp, id: crypto.randomUUID() }],
      })),
    removeExperience: (id) =>
      set((state) => ({ experience: removeItem(state.experience, id) })),

    setEducation: (education) => set({ education }),
    addEducation: (edu) =>
      set((state) => ({
        education: [...state.education, { ...edu, id: crypto.randomUUID() }],
      })),
    removeEducation: (id) =>
      set((state) => ({ education: removeItem(state.education, id) })),

    setPersonalInfo: (personalInfo) => set({ personalInfo }),

    addSkill: (name) =>
      set((state) => ({ skills: addItem(state.skills, name) })),
    removeSkill: (id) =>
      set((state) => ({ skills: removeItem(state.skills, id) })),

    addCertificate: (name) =>
      set((state) => ({ certificates: addItem(state.certificates, name) })),
    removeCertificate: (id) =>
      set((state) => ({ certificates: removeItem(state.certificates, id) })),

    addCourse: (name) =>
      set((state) => ({ courses: addItem(state.courses, name) })),
    removeCourse: (id) =>
      set((state) => ({ courses: removeItem(state.courses, id) })),

    addLanguage: (name, level) =>
      set((state) => ({
        languages: [
          ...state.languages,
          { id: crypto.randomUUID(), name, level },
        ],
      })),
    removeLanguage: (id) =>
      set((state) => ({ languages: removeItem(state.languages, id) })),

    setHobby: (hobby) => set({ hobby }),
    setGeneralDescription: (generalDescription) => set({ generalDescription }),
    setPhoto: (photo) => set({ photo }),

    resetCvStore: () => set(initialCvState),
  },
}));
