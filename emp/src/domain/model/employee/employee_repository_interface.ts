import { Employee } from "./employee";

export interface EmployeeRepositoryInterface {
    ofId(id: number): Promise<Employee>;
    findAll(): Promise<Employee[]>;
    save(emp: Employee);
}
