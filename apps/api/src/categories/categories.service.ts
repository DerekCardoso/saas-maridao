import { Injectable } from "@nestjs/common"
import { asc, eq } from "drizzle-orm"
import { DatabaseService } from "../database/database.service"
import { serviceCategories } from "../database/schema"

@Injectable()
export class CategoriesService {
  constructor(private readonly database: DatabaseService) {}

  list() {
    return this.database.db
      .select()
      .from(serviceCategories)
      .where(eq(serviceCategories.isActive, true))
      .orderBy(asc(serviceCategories.name))
  }
}
