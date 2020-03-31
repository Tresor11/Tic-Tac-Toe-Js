import dom from './dom';
import { start, cancel, playAgain } from './game';

const showFrom = () => { dom.show('modal'); };
dom.getElement('submit').addEventListener('click', start);
dom.getElement('start').addEventListener('click', showFrom);
dom.getElement('cancel').addEventListener('click', cancel);
dom.getElement('again').addEventListener('click', playAgain);