
import {persistStore} from './persistStore';

const defaultData = true;

export const store = persistStore('data', defaultData);