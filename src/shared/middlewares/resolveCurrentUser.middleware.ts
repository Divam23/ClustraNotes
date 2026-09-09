import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import User from "@/modules/users/models/users.model";
import { ApiError } from "../utils/ApiError";

export const resolveCurrentUser = asyncHandler(async(req:Request, res:Response, next: NextFunction)=>{
    const firebaseUser = req.firebaseUser;
    if(!firebaseUser) throw new ApiError(404, "User not found");

    const user = await User.findOne(
        {firebaseUid: firebaseUser.uid}
    );
    if(!user){
        throw new ApiError(404, "User Not Found");
    }

    req.user = user;
    next();
})