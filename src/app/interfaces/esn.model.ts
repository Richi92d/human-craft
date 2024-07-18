export interface Status {
    label: string;
    color: string;
}

export interface EsnInfo {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export interface Experience {
    id: string;
    title: string;
    description: string;
    company: string;
    location: string;
}

export interface Education {
    id: string;
    title: string;
    level: string;
    organization: string;
    location: string;
}

export interface Esn {
    id: number;
    role: string;
    status: Status;
    experiencesYears: number;
    availabilityDate: string;
    dailyRate: number;
    user: EsnInfo;
    experiences: Experience[];
    education: Education[];
}
