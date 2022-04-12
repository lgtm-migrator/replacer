import reactLayouts from 'atherdon-newsletter-react';

import {
  writeHTML,

  checkWarnings,

  printMessage,
  generateTemplateName,
} from 'markup-generator';

import {
  parseMDReact,
  parseMDReactFullThing,
} from './parse';

// ---
  
// TODO add more messages here
const MESSAGE_REACT_FULL_TEMPLATE = 'The FullTemplate has been parsed successfully';
const MESSAGE_REACT_CONTENT = 'The Content has been parsed successfully';



const reactComponent = `
import React from "react";

const Content = () => {
  return (
    <>
      {content}
    </>
  );
};

export default Content;
`;



function reactComponentReplace(content) {
  return reactComponent.replace(/{content}/g, content);
}



// ---

var Singleton = (function () {
    var instance;

    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// ---

function writeReactComponent(fileName, content, dir = 'generated', message) {
  const result = reactComponentReplace(content);
  writeHTML(fileName, result, dir, message);
}



function generate_write_print(content, name, extention, message){
  
  const fileName = generateTemplateName(name, extention);
  writeReactComponent(fileName, content);
  
  printMessage(message, 'green2');

}




function generateReactContent(sourceFile) {
  
  const { content, warnings } = parseMDReact(sourceFile);
  // console.log("parsedContent", { content, warnings, previewText });

  // ***
  checkWarnings(warnings);

 
  generate_write_print(content, 'Content', 'js', MESSAGE_REACT_CONTENT);
  
}

function generateReactFullTemplate(sourceFile) {
  const { content, warnings, previewText } = parseMDReact(sourceFile)

  // ***
  checkWarnings(warnings);

  const fullContent = reactLayouts.reactFullTemplate(content);
 
  generate_write_print(fullContent, 'FullTemplate', 'js', MESSAGE_REACT_FULL_TEMPLATE);
  
}



export {

  reactComponent,
  reactComponentReplace,
  writeReactComponent,

  generateReactContent,
  generateReactFullTemplate,

  MESSAGE_REACT_FULL_TEMPLATE,
  MESSAGE_REACT_CONTENT,
};
