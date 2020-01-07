export enum OrderBy {
	LATEST='latest',
	OLDEST='oldest',
	POPULAR='popular'
}


export class Pagination {
	public static fromExist(existingPagination: Pagination) {
		const {perPage, page, orderBy} = existingPagination;
		return new Pagination(perPage, page, orderBy);
	}

	constructor(
		public readonly perPage: number = 10,
		public readonly page: number = 1,
		public readonly orderBy: OrderBy = OrderBy.LATEST,
		) {
	}
}