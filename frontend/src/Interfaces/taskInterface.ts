export default interface ITask {
    _id: string
  owner: string;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  priority: string;
  category: string
}
