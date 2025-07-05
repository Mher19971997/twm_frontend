"use client";
import { UserRoles } from "@/constants/userRoles";

export type LoginResponseType = {
  access_token: string
  refresh_token: string
}

// @ApiProperty({ required: false })
// declare email?: string;
// @ApiProperty()
// declare phone?: string;
// @ApiProperty({ required: false })
// declare firstName?: string;
// @ApiProperty()
// declare timezone?: string;
// @ApiProperty()
// declare lastName?: string;
// @ApiProperty({ required: false, readOnly: true })
// declare password?: string;
// roles enum  - student, teacher, parent


export type UserType = {
  uuid?: number | string
  userId?: number | string
  roles: UserRoles[] | string
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  password: string
  socketId?: string
  timezone?: string
  classUuid: string | undefined
  telegram?: string,
  whatsapp?: string,
  classes?: string[],
  subjectUuId?: string 
}

export type GetAdminsResponseType = {
  users: AdminType[]
  totalCount: number
}

export type AdminType = {
  id: number
  role: string | undefined
  fullName: string
  phone: string
  email: string
  login: string
}

export type GetCurrentAdminResponseType = {
  id: number
  role: string
  fullName: string
  phone: string
  email: string
  login: string
  password: string
  isBlocked: boolean
}

export type GetCompaniesResponseType = {
  companies: CompaniesType[]
  totalCount: number
}

export type CompaniesType = {
  id: number
  name: string
  role: string
  city: string
  address: string
  contactFullName: string
  contactPhone: string
  email: string
  inn: string
  description: string
  isBlocked: boolean
  createdAt: string
  comments: CommentsType[]
  employees: EmployeeType[]
  images: string[]
  logo?: any
}

export type EmployeeType = {
  id: number | string
  createdAt: string
  company?: CompaniesType
}

export type CreateStaffResponseType = {
  employees: StaffType[]
  totalCount: number
}

export type StaffType = {
  id: number
  createdAt: string
  user: UserType
  company: CompaniesType
}

export type GetPlatformsResponseType = {
  places: PlaceType[]
  totalCount: number
}

export type GetEstablishmentsResponseType = {
  totalCount: number
  establishments: EstablishmentsType[]
}

export type EstablishmentsType = {
  id: number
  name: string
  address: string
  description?: string
  city?: string
  size: string
  images: []
  logo?: string
  company: CompaniesType
  place: PlaceType
  establishment?: EstablishmentsType
  places?: PlaceEstablishment[]
}


export type PlaceType = {
  id: number
  name: string
  city: string
  address: string
  size: number
  description: string
  color: string
  images: string[]
  files: string[]
  createdAt: string
  company: CompaniesType
  isBlocked: boolean
  establishment?: string
}

export interface ClaimResponseType {
  peopleCount: string
  startDate: string
  endDate: string
  user: UserType
  place: PlaceType
  id: number
  status: string
  createdAt: string
  description: string | null
  comments: CommentsType[]
  price?: string
  segment?: string
  order: OrdersType
}

export interface ClaimForTableType {
  peopleCount: string
  startDate: number[]
  endDate: number[]
  startTime: string
  endTime: string
  user: UserType
  place: PlaceType
  id: number
  status: string
  createdAt: string
}

export type GetCompanyCommentsResponseType = CommentsType[]

export interface CommentsType {
  id: number
  text: string
  file: any
  createdAt: string
  company: CompaniesType
  user: UserType
}

export type GetRegistrationRequestType = {
  requests: RegistrationRequestType[]
  totalCount: number
}

export type RegistrationRequestType = {
  id: number
  companyName: string
  inn: string
  city: string
  address: string
  contactFullName: string
  contactPhone: string
  email: string
  login: string
  password: string
  role: string
  status: string
  createdAt: string
}

export type CategoryType = {
  id: number
  title: string
}

export type ClaimsFromPlacesResponseType = ClaimsFromPlacesType[]

export type ClaimsFromPlacesType = {
  id: number
  name: string
  city: string
  address: string
  size: number
  description: string
  color: string
  images: string[]
  files: string[]
  isBlocked: boolean
  createdAt: string
  requests: RequestType[]
}

export type RequestType = {
  id: number
  name: string
  status: string
  peopleCount: number
  startDate: string
  endDate: string
  description: any
  files: any[]
  createdAt: string
  user: UserType
  order: OrdersType
}

export type getMeResponseData = {
  id: number
  createdAt: string
  user: UserType
  company: CompaniesType
}


export type PlaceEstablishment = {
  id: number;
  name: string;
  city: string;
  address: string;
  size: 96,
  description: string;
  color: string;
  images: string[];
  files: [];
  isBlocked: boolean;
  createdAt: string;
}



export type GetCategoriesResponseType = {
  totalCount: number
  category: CategoriesType[]
}


export type CategoriesType = {
  id: number
  name: string
  description?: string
  createdAt: string
  company: CompaniesType
  products: ProductType
}


export type ProductType = {
  id: number
  name: string
  description?: string
  weight: string
  measurement: string
  price: string
  images: string[];
  logo?: any
  createdAt: string;
}

export type ProductsType = {
  id: number
  name: string
  description?: string
  weight: string
  measurement: string
  price: string
  images: string[];
  logo?: any
  createdAt: string;
  category: CategoriesTypeForProduct
  quantity?: string;
}


export type GetProductsResponseType = {
  totalCount: number
  products: ProductsType[]
}

export type CategoriesTypeForProduct = {
  id: number
  images: string[];
  logo?: any
  name: string
  description?: string
  createdAt: string
  company: CompaniesType

}

export type MenuType = {
  id: number
  name: string
  description?: string
  categoryIds?: []
  menuCategories?: []
}

export type GetMenuResponseType = {
  totalCount: number
  menu: MenuType[]
}


export type OrdersType = {
  id: number
  orderId: number
  productIds: number[]
  totalPrice: number
  orderDetails: OrderProductType[]
}

export type OrderProductType = {
  productId: number
  name: string
  quantity: number
  price: number
}
export type GetOrdersResponseType = {
  totalCount: number
  orders: OrdersType[]
}


export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  roles: UserRoles[];
}

export type ClassItem = {
  uuid: string;
  name: string;
  userUuid: string;
  classUuid: string;
};

export interface ProfileType {
  uuid: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  timezone: string | null;
  phone: string | null;
  roles: UserRoles[];
  classUuid: string | null;
  userId: number;
  socketId: string | null;
  profile: {
    uuid: string | number;
    avatarUrl: string | null;
    bio: string | null;
    location: string | null;
    userUuid: string;
    middleName: string;
    telegram: string;
  };
  classes: ClassItem[]
}

export interface ProfileResponseType {
  profile: ProfileType;
}

export interface UsersResponseType {
  users: ProfileType;
}

export interface IUpdateProfile {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  telegram?: string;
  timezone?: string;
  phone?: any,
  bio?: string;
  location?: string;
  userUuid?: string;
  avatar?: File | null;
  profile?: {
    middleName: string;
    telegram: string;
  };
}

export interface ISelectedUser {
  uuid: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  isOnline?: boolean;
  lastMessage?: string;
  lastMessageAt?: Date;
  unreadCount?: number;
  isGroup: true | false;
  roomUuid: string;
  email: string
}
