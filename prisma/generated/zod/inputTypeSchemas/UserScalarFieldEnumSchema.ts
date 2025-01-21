import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','role']);

export default UserScalarFieldEnumSchema;
