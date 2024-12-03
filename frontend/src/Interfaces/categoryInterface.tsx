import ITask from "./taskInterface";


export default interface ICategory {
  _id: string;
  owner: string;
  categoryName: string;
  tasks: ITask[];
}
