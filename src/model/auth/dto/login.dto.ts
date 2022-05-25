import { PickType } from "@nestjs/mapped-types";
import { User } from "../../user/schemas/user.schema";

export class LoginDto extends PickType(User, ["email", "password"] as const) {}