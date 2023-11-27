
export interface IBaseController<T, C, U> {
    create(dto: C): Promise<T>
    getAll(dto: any): Promise<T[]>
    getById(id: string): Promise<T>
    deleteById(id: string): Promise<T>
    updateById(id: string, dto: U): Promise<T>
}