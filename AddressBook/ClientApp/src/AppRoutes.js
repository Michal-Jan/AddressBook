import AddPerson from './components/AddPerson';
import EditPerson from './components/EditPerson';
import { Home } from './components/Home';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/AddPerson',
    element: <AddPerson />
  },
  {
    path: '/EditPerson/:personId',
    element: <EditPerson />
  }
];

export default AppRoutes;
