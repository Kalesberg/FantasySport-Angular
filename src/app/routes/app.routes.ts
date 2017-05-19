import {AdminRoutes} from './admin.routes'
import {FrontRoutes} from './front.routes'

export const AppRoutes = [
{ path: 'admin', children: AdminRoutes },
{ path: '', children: FrontRoutes },
];