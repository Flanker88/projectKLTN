/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import Main from 'main/Main';
import App from 'main/App';
import Test from 'main/Test';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Main);
