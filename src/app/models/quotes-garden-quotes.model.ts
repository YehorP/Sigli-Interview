export type QuotesGardenQuote = {
    _id: string;
    quoteText: string;
    quoteAuthor: string;
    quoteGenre: string;
    __v: number;
}
    
export type QuotesGardenQuotes = {
    totalQuotes: number;
    data: QuotesGardenQuote[];
    statusCode: number;
    message: string;
    pagination: {
        currentPage: number;
        nextPage: number;
        totalPages: number;
    };   
}