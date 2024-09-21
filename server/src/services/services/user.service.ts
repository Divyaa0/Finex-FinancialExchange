import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserInfo } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/database/entities/role.entity';
import { Repository } from 'typeorm';
import { IUser } from '../interface/iuser.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class userService implements IUser {
  constructor(
    @InjectRepository(UserInfo)
    private userTable: Repository<UserInfo>,
    private jwtService: JwtService
  ) { }



  async getAllBalances(request): Promise<any> {
    try {
      const { email, password } = request;
      console.log("🚀 ~ userService ~ getUserDetails ~ email:", email);

      // Logic to retrieve user details
      const userDetails = await this.userTable.findOne({
        relations: {
          role: true,
        },
        where: {
          email: email,
        },
      });

      console.log("🚀 ~ userService ~ getAllBalances ~ userDetails:", userDetails);

      if (!userDetails) {
        console.error("🚀 ~ userService ~ getUserDetails ~ User not found");
        return {
          error: true,
          message: "User not found",
        };
      }

      if (userDetails.password !== password) {
        console.error("🚀 ~ userService ~ getUserDetails ~ Invalid email or password");
        return {
          error: true,
          message: "Invalid email or password",
        };
      }

      console.log("🚀 ~ userService ~ getUserDetails ~ Password verified");

      if (userDetails.role.name !== "admin") {
        console.log("🚀 ~ userService ~ getUserDetails ~ Does not have admin access");
        return {
          error: true,
          message: "User does not have admin access",
        };
      }
      const allUserDetails = await this.userTable.find();
      console.log("🚀 ~ userService ~ allUserDetails:", allUserDetails)

      return {
        success: true,
        message: "Admin access granted !",
        details: allUserDetails

      }

    } catch (error) {
      console.error("🚀 ~ userService ~ getUserDetails ~ Error:", error);
      return {
        error: true,
        message: "An unexpected error occurred while retrieving user details.",
      };
    }



  }


  async getUserDetails(request): Promise<any> {
   
    const user = request['user']
    console.log("🚀 ~ userService ~ getUserDetails ~ user:", user)
    const email=user.email

    // Logic to retrieve user details
    const userDetails = await this.userTable.findOne(
      {
        relations: {
          role: true,
        },
        where: { email: email }
      }
    )

    if (userDetails ) {
      console.log("🚀 ~ userService ~ getUserDetails ~ Password verified");
      return userDetails;
    } else {
      console.error("🚀 ~ userService ~ getUserDetails ~ Invalid email");
      return {
        error: true,
        message: "Invalid email "
      }
    }


  }

  async validateUserDetails(request): Promise<any> {
    const { email, password } = request;

    console.log("🚀 ~ userService ~ getUserDetails ~ email:", email)
    const userDetails = await this.userTable.findOne(
      {
        relations: {
          role: true,
        },
        where: { email: email }
      }
    )

    if (userDetails && userDetails.password === password) {
      console.log("🚀 ~ userService ~ getUserDetails ~ Password verified");
      const payload = { email: userDetails.email, name: userDetails.name };
      // return userDetails;
      console.log("🚀 ~ userService ~ validateUserDetails ~ payload:", payload)
      return {
        accesstoken: await this.jwtService.signAsync(payload),
      };
    } else {
      console.error("🚀 ~ userService ~ getUserDetails ~ Invalid email or password");
      return {
        error: true,
        message: "Invalid email or password"
      }
    }


  }



}
