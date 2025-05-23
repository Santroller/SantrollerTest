import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SettingsPage } from './pages/Settings.page';
import { DevicesPage } from './pages/Devices.page';
import { InputsPage } from './pages/Inputs.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SettingsPage />,
  },{
    path: '/devices',
    element: <DevicesPage />,
  },{
    path: '/profiles',
    element: <InputsPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
