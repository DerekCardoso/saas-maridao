import { Controller, Get, Query } from "@nestjs/common"
import { providerSearchSchema, type ProviderSearchInput } from "@maridao/shared"
import { Public } from "../auth/public.decorator"
import { ZodValidationPipe } from "../common/zod-validation.pipe"
import { SearchService } from "./search.service"

@Controller("providers")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Public()
  @Get("search")
  search(@Query(new ZodValidationPipe(providerSearchSchema)) input: ProviderSearchInput) {
    return this.searchService.search(input)
  }
}
