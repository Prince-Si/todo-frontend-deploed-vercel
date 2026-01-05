import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';
import ThirdComponent from './ThirdComponent';
import FourthComponent from './FourthComponent';
import { FifthComponent } from './FirstComponent';
import LearningJavaScript from './LearningJavaScript';
//braces in imports express that this is not the default export. e.g FifthComponent is not the default exprot from firstcomponent module

export default function LearningComponent() {
  return (
    <div className="App">
      <FirstComponent></FirstComponent>
      <SecondComponent/>
      <ThirdComponent/>
      <FourthComponent></FourthComponent>
      <FifthComponent/>
      <LearningJavaScript/>
    </div>
  );
}
