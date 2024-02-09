export type QuotableQuote = {
    _id: string
    content: string
    author: string
    tags: string[]
    authorSlug: string
    length: number
    dateAdded: string
    dateModified: string
}

export type QuotableQuotes = {
    count: number
    totalCount: number
    page: number
    totalPages: number
    lastItemIndex: number
    results: QuotableQuote[]
}
