import './global.scss';
import './print.scss';
import Promise from 'promise-polyfill';
import { initializeGA } from './utils/initializeGA';
import "intersection-observer";
import lozad from 'lozad';
import "./utils/menu"
import "./articles/presentation/homeNews"

/** lightweight promise polyfill */
if (!window.Promise) window.Promise = Promise;

document.addEventListener('DOMContentLoaded', () => {
    initializeGA();
    lozad().observe();
});