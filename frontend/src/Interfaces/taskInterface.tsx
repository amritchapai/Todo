export default interface ITask {
    _id: string
  owner: string;
  title: string;
  description: string;
  deadline: string;
  category: string;
  completed: boolean;
  priority: string;
}
