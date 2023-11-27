
export interface IBaseService<T, C, U> {
    create(data: C): Promise<T>
    getAll(data: any): Promise<T[]>
    getById(_id: string): Promise<T>
    deleteById(_id: string): Promise<T>
    updateById(_id: string, data: U): Promise<T>
}