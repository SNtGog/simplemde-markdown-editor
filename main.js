function fixShortcut(e){return e=isMac?e.replace("Ctrl","Cmd"):e.replace("Cmd","Ctrl")}function createIcon(e,t,i){e=e||{};var o=document.createElement("a");return t=void 0==t?!0:t,e.title&&t&&(o.title=createTootlip(e.title,e.action,i),isMac&&(o.title=o.title.replace("Ctrl","⌘"),o.title=o.title.replace("Alt","⌥"))),o.tabIndex=-1,o.className=e.className,o}function createSep(){var e=document.createElement("i");return e.className="separator",e.innerHTML="|",e}function createTootlip(e,t,i){var o,a=e;return t&&(o=getBindingName(t),i[o]&&(a+=" ("+fixShortcut(i[o])+")")),a}function getState(e,t){t=t||e.getCursor("start");var i=e.getTokenAt(t);if(!i.type)return{};for(var o,a,n=i.type.split(" "),r={},l=0;l<n.length;l++)o=n[l],"strong"===o?r.bold=!0:"variable-2"===o?(a=e.getLine(t.line),/^\s*\d+\.\s/.test(a)?r["ordered-list"]=!0:r["unordered-list"]=!0):"atom"===o?r.quote=!0:"em"===o?r.italic=!0:"quote"===o?r.quote=!0:"strikethrough"===o?r.strikethrough=!0:"comment"===o?r.code=!0:"link"===o?r.link=!0:"tag"===o?r.image=!0:o.match(/^header(\-[1-6])?$/)&&(r[o.replace("header","heading")]=!0);return r}function toggleFullScreen(e){var t=e.codemirror;t.setOption("fullScreen",!t.getOption("fullScreen")),t.getOption("fullScreen")?(saved_overflow=document.body.style.overflow,document.body.style.overflow="hidden"):document.body.style.overflow=saved_overflow;var i=t.getWrapperElement();/fullscreen/.test(i.previousSibling.className)?i.previousSibling.className=i.previousSibling.className.replace(/\s*fullscreen\b/,""):i.previousSibling.className+=" fullscreen";var o=e.toolbarElements.fullscreen;/active/.test(o.className)?o.className=o.className.replace(/\s*active\s*/g,""):o.className+=" active";var a=t.getWrapperElement().nextSibling;/editor-preview-active-side/.test(a.className)&&toggleSideBySide(e)}function toggleBold(e){_toggleBlock(e,"bold",e.options.blockStyles.bold)}function toggleItalic(e){_toggleBlock(e,"italic",e.options.blockStyles.italic)}function toggleStrikethrough(e){_toggleBlock(e,"strikethrough","~~")}function toggleCodeBlock(e){function t(e){if("object"!=typeof e)throw"fencing_line() takes a 'line' object (not a line number, or line text).  Got: "+typeof e+": "+e;return e.styles&&e.styles[2]&&-1!==e.styles[2].indexOf("formatting-code-block")}function i(e){return e.state.base.base||e.state.base}function o(e,o,a,n,r){a=a||e.getLineHandle(o),n=n||e.getTokenAt({line:o,ch:1}),r=r||!!a.text&&e.getTokenAt({line:o,ch:a.text.length-1});var l=n.type?n.type.split(" "):[];return r&&i(r).indentedCode?"indented":-1===l.indexOf("comment")?!1:i(n).fencedChars||i(r).fencedChars||t(a)?"fenced":"single"}function a(e,t,i,o){var a=t.line+1,n=i.line+1,r=t.line!==i.line,l=o+"\n",s="\n"+o;r&&n++,r&&0===i.ch&&(s=o+"\n",n--),_replaceSelection(e,!1,[l,s]),e.setSelection({line:a,ch:0},{line:n,ch:0})}var n,r,l,s=e.options.blockStyles.code,c=e.codemirror,d=c.getCursor("start"),g=c.getCursor("end"),u=c.getTokenAt({line:d.line,ch:d.ch||1}),m=c.getLineHandle(d.line),p=o(c,d.line,m,u);if("single"===p){var f=m.text.slice(0,d.ch).replace("`",""),h=m.text.slice(d.ch).replace("`","");c.replaceRange(f+h,{line:d.line,ch:0},{line:d.line,ch:99999999999999}),d.ch--,d!==g&&g.ch--,c.setSelection(d,g),c.focus()}else if("fenced"===p)if(d.line!==g.line||d.ch!==g.ch){for(n=d.line;n>=0&&(m=c.getLineHandle(n),!t(m));n--);var v,S,b,w,k=c.getTokenAt({line:n,ch:1}),y=i(k).fencedChars;t(c.getLineHandle(d.line))?(v="",S=d.line):t(c.getLineHandle(d.line-1))?(v="",S=d.line-1):(v=y+"\n",S=d.line),t(c.getLineHandle(g.line))?(b="",w=g.line,0===g.ch&&(w+=1)):0!==g.ch&&t(c.getLineHandle(g.line+1))?(b="",w=g.line+1):(b=y+"\n",w=g.line+1),0===g.ch&&(w-=1),c.operation(function(){c.replaceRange(b,{line:w,ch:0},{line:w+(b?0:1),ch:0}),c.replaceRange(v,{line:S,ch:0},{line:S+(v?0:1),ch:0})}),c.setSelection({line:S+(v?1:0),ch:0},{line:w+(v?1:-1),ch:0}),c.focus()}else{var E=d.line;if(t(c.getLineHandle(d.line))&&("fenced"===o(c,d.line+1)?(n=d.line,E=d.line+1):(r=d.line,E=d.line-1)),void 0===n)for(n=E;n>=0&&(m=c.getLineHandle(n),!t(m));n--);if(void 0===r)for(l=c.lineCount(),r=E;l>r&&(m=c.getLineHandle(r),!t(m));r++);c.operation(function(){c.replaceRange("",{line:n,ch:0},{line:n+1,ch:0}),c.replaceRange("",{line:r-1,ch:0},{line:r,ch:0})}),c.focus()}else if("indented"===p){if(d.line!==g.line||d.ch!==g.ch)n=d.line,r=g.line,0===g.ch&&r--;else{for(n=d.line;n>=0;n--)if(m=c.getLineHandle(n),!m.text.match(/^\s*$/)&&"indented"!==o(c,n,m)){n+=1;break}for(l=c.lineCount(),r=d.line;l>r;r++)if(m=c.getLineHandle(r),!m.text.match(/^\s*$/)&&"indented"!==o(c,r,m)){r-=1;break}}var H=c.getLineHandle(r+1),N=H&&c.getTokenAt({line:r+1,ch:H.text.length-1}),B=N&&i(N).indentedCode;B&&c.replaceRange("\n",{line:r+1,ch:0});for(var M=n;r>=M;M++)c.indentLine(M,"subtract");c.focus()}else{var C=d.line===g.line&&d.ch===g.ch&&0===d.ch,L=d.line!==g.line;C||L?a(c,d,g,s):_replaceSelection(c,!1,["`","`"])}}function toggleBlockquote(e){var t=e.codemirror;_toggleLine(t,"quote")}function toggleHeadingSmaller(e){var t=e.codemirror;_toggleHeading(t,"smaller")}function toggleHeadingBigger(e){var t=e.codemirror;_toggleHeading(t,"bigger")}function toggleHeading1(e){var t=e.codemirror;_toggleHeading(t,void 0,1)}function toggleHeading2(e){var t=e.codemirror;_toggleHeading(t,void 0,2)}function toggleHeading3(e){var t=e.codemirror;_toggleHeading(t,void 0,3)}function toggleUnorderedList(e){var t=e.codemirror;_toggleLine(t,"unordered-list")}function toggleOrderedList(e){var t=e.codemirror;_toggleLine(t,"ordered-list")}function cleanBlock(e){var t=e.codemirror;_cleanBlock(t)}function drawLink(e){var t=e.codemirror,i=getState(t),o=e.options,a="http://";return o.promptURLs&&(a=prompt(o.promptTexts.link),!a)?!1:void _replaceSelection(t,i.link,o.insertTexts.link,a)}function drawImage(e){var t=e.codemirror,i=getState(t),o=e.options,a="http://";return o.promptURLs&&(a=prompt(o.promptTexts.image),!a)?!1:void _replaceSelection(t,i.image,o.insertTexts.image,a)}function drawTable(e){var t=e.codemirror,i=getState(t),o=e.options;_replaceSelection(t,i.table,o.insertTexts.table)}function drawHorizontalRule(e){var t=e.codemirror,i=getState(t),o=e.options;_replaceSelection(t,i.image,o.insertTexts.horizontalRule)}function undo(e){var t=e.codemirror;t.undo(),t.focus()}function redo(e){var t=e.codemirror;t.redo(),t.focus()}function toggleSideBySide(e){var t=e.codemirror,i=t.getWrapperElement(),o=i.nextSibling,a=e.toolbarElements["side-by-side"],n=!1;/editor-preview-active-side/.test(o.className)?(o.className=o.className.replace(/\s*editor-preview-active-side\s*/g,""),a.className=a.className.replace(/\s*active\s*/g,""),i.className=i.className.replace(/\s*CodeMirror-sided\s*/g," ")):(setTimeout(function(){t.getOption("fullScreen")||toggleFullScreen(e),o.className+=" editor-preview-active-side"},1),a.className+=" active",i.className+=" CodeMirror-sided",n=!0);var r=i.lastChild;if(/editor-preview-active/.test(r.className)){r.className=r.className.replace(/\s*editor-preview-active\s*/g,"");var l=e.toolbarElements.preview,s=i.previousSibling;l.className=l.className.replace(/\s*active\s*/g,""),s.className=s.className.replace(/\s*disabled-for-preview*/g,"")}var c=function(){o.innerHTML=e.options.previewRender(e.value(),o)};t.sideBySideRenderingFunction||(t.sideBySideRenderingFunction=c),n?(o.innerHTML=e.options.previewRender(e.value(),o),t.on("update",t.sideBySideRenderingFunction)):t.off("update",t.sideBySideRenderingFunction)}function togglePreview(e){var t=e.codemirror,i=t.getWrapperElement(),o=i.previousSibling,a=e.options.toolbar?e.toolbarElements.preview:!1,n=i.lastChild;n&&/editor-preview/.test(n.className)||(n=document.createElement("div"),n.className="editor-preview",i.appendChild(n)),/editor-preview-active/.test(n.className)?(n.className=n.className.replace(/\s*editor-preview-active\s*/g,""),a&&(a.className=a.className.replace(/\s*active\s*/g,""),o.className=o.className.replace(/\s*disabled-for-preview*/g,""))):(setTimeout(function(){n.className+=" editor-preview-active"},1),a&&(a.className+=" active",o.className+=" disabled-for-preview")),n.innerHTML=e.options.previewRender(e.value(),n);var r=t.getWrapperElement().nextSibling;/editor-preview-active-side/.test(r.className)&&toggleSideBySide(e)}function _replaceSelection(e,t,i,o){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)){var a,n=i[0],r=i[1],l=e.getCursor("start"),s=e.getCursor("end");o&&(r=r.replace("#url#",o)),t?(a=e.getLine(l.line),n=a.slice(0,l.ch),r=a.slice(l.ch),e.replaceRange(n+r,{line:l.line,ch:0})):(a=e.getSelection(),e.replaceSelection(n+a+r),l.ch+=n.length,l!==s&&(s.ch+=n.length)),e.setSelection(l,s),e.focus()}}function _toggleHeading(e,t,i){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)){for(var o=e.getCursor("start"),a=e.getCursor("end"),n=o.line;n<=a.line;n++)!function(o){var a=e.getLine(o),n=a.search(/[^#]/);a=void 0!==t?0>=n?"bigger"==t?"###### "+a:"# "+a:6==n&&"smaller"==t?a.substr(7):1==n&&"bigger"==t?a.substr(2):"bigger"==t?a.substr(1):"#"+a:1==i?0>=n?"# "+a:n==i?a.substr(n+1):"# "+a.substr(n+1):2==i?0>=n?"## "+a:n==i?a.substr(n+1):"## "+a.substr(n+1):0>=n?"### "+a:n==i?a.substr(n+1):"### "+a.substr(n+1),e.replaceRange(a,{line:o,ch:0},{line:o,ch:99999999999999})}(n);e.focus()}}function _toggleLine(e,t){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)){for(var i=getState(e),o=e.getCursor("start"),a=e.getCursor("end"),n={quote:/^(\s*)\>\s+/,"unordered-list":/^(\s*)(\*|\-|\+)\s+/,"ordered-list":/^(\s*)\d+\.\s+/},r={quote:"> ","unordered-list":"* ","ordered-list":"1. "},l=o.line;l<=a.line;l++)!function(o){var a=e.getLine(o);a=i[t]?a.replace(n[t],"$1"):r[t]+a,e.replaceRange(a,{line:o,ch:0},{line:o,ch:99999999999999})}(l);e.focus()}}function _toggleBlock(e,t,i,o){if(!/editor-preview-active/.test(e.codemirror.getWrapperElement().lastChild.className)){o="undefined"==typeof o?i:o;var a,n=e.codemirror,r=getState(n),l=i,s=o,c=n.getCursor("start"),d=n.getCursor("end");r[t]?(a=n.getLine(c.line),l=a.slice(0,c.ch),s=a.slice(c.ch),"bold"==t?(l=l.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/,""),s=s.replace(/(\*\*|__)/,"")):"italic"==t?(l=l.replace(/(\*|_)(?![\s\S]*(\*|_))/,""),s=s.replace(/(\*|_)/,"")):"strikethrough"==t&&(l=l.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/,""),s=s.replace(/(\*\*|~~)/,"")),n.replaceRange(l+s,{line:c.line,ch:0},{line:c.line,ch:99999999999999}),"bold"==t||"strikethrough"==t?(c.ch-=2,c!==d&&(d.ch-=2)):"italic"==t&&(c.ch-=1,c!==d&&(d.ch-=1))):(a=n.getSelection(),"bold"==t?(a=a.split("**").join(""),a=a.split("__").join("")):"italic"==t?(a=a.split("*").join(""),a=a.split("_").join("")):"strikethrough"==t&&(a=a.split("~~").join("")),n.replaceSelection(l+a+s),c.ch+=i.length,d.ch=c.ch+a.length),n.setSelection(c,d),n.focus()}}function _cleanBlock(e){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className))for(var t,i=e.getCursor("start"),o=e.getCursor("end"),a=i.line;a<=o.line;a++)t=e.getLine(a),t=t.replace(/^[ ]*([# ]+|\*|\-|[> ]+|[0-9]+(.|\)))[ ]*/,""),e.replaceRange(t,{line:a,ch:0},{line:a,ch:99999999999999})}function _mergeProperties(e,t){for(var i in t)t.hasOwnProperty(i)&&(t[i]instanceof Array?e[i]=t[i].concat(e[i]instanceof Array?e[i]:[]):null!==t[i]&&"object"==typeof t[i]&&t[i].constructor===Object?e[i]=_mergeProperties(e[i]||{},t[i]):e[i]=t[i]);return e}function extend(e){for(var t=1;t<arguments.length;t++)e=_mergeProperties(e,arguments[t]);return e}function wordCount(e){var t=/[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g,i=e.match(t),o=0;if(null===i)return o;for(var a=0;a<i.length;a++)o+=i[a].charCodeAt(0)>=19968?i[a].length:1;return o}function SimpleMDE(e){e=e||{},e.parent=this;var t=!0;if(e.autoDownloadFontAwesome===!1&&(t=!1),e.autoDownloadFontAwesome!==!0)for(var i=document.styleSheets,o=0;o<i.length;o++)i[o].href&&i[o].href.indexOf("//maxcdn.bootstrapcdn.com/font-awesome/")>-1&&(t=!1);if(t){var a=document.createElement("link");a.rel="stylesheet",a.href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css",document.getElementsByTagName("head")[0].appendChild(a)}if(e.element)this.element=e.element;else if(null===e.element)return void console.log("SimpleMDE: Error. No element was found.");if(void 0===e.toolbar){e.toolbar=[];for(var n in toolbarBuiltInButtons)toolbarBuiltInButtons.hasOwnProperty(n)&&(-1!=n.indexOf("separator-")&&e.toolbar.push("|"),(toolbarBuiltInButtons[n]["default"]===!0||e.showIcons&&e.showIcons.constructor===Array&&-1!=e.showIcons.indexOf(n))&&e.toolbar.push(n))}e.hasOwnProperty("status")||(e.status=["autosave","lines","words","cursor"]),e.previewRender||(e.previewRender=function(e){return this.parent.markdown(e)}),e.parsingConfig=extend({highlightFormatting:!0},e.parsingConfig||{}),e.insertTexts=extend({},insertTexts,e.insertTexts||{}),e.promptTexts=promptTexts,e.blockStyles=extend({},blockStyles,e.blockStyles||{}),e.shortcuts=extend({},shortcuts,e.shortcuts||{}),void 0!=e.autosave&&void 0!=e.autosave.unique_id&&""!=e.autosave.unique_id&&(e.autosave.uniqueId=e.autosave.unique_id),this.options=e,this.render(),!e.initialValue||this.options.autosave&&this.options.autosave.foundSavedValue===!0||this.value(e.initialValue)}function isLocalStorageAvailable(){if("object"!=typeof localStorage)return!1;try{localStorage.setItem("smde_localStorage",1),localStorage.removeItem("smde_localStorage")}catch(e){return!1}return!0}var CodeMirror=require("codemirror");require("codemirror/addon/edit/continuelist.js"),require("./codemirror/tablist"),require("codemirror/addon/display/fullscreen.js"),require("codemirror/mode/markdown/markdown.js"),require("codemirror/addon/mode/overlay.js"),require("codemirror/addon/display/placeholder.js"),require("codemirror/mode/gfm/gfm.js"),require("codemirror/mode/xml/xml.js"),require("spell-checker");var marked=require("marked"),isMac=/Mac/.test(navigator.platform),bindings={toggleBold:toggleBold,toggleItalic:toggleItalic,drawLink:drawLink,toggleHeadingSmaller:toggleHeadingSmaller,toggleHeadingBigger:toggleHeadingBigger,drawImage:drawImage,toggleBlockquote:toggleBlockquote,toggleOrderedList:toggleOrderedList,toggleUnorderedList:toggleUnorderedList,toggleCodeBlock:toggleCodeBlock,togglePreview:togglePreview,toggleStrikethrough:toggleStrikethrough,toggleHeading1:toggleHeading1,toggleHeading2:toggleHeading2,toggleHeading3:toggleHeading3,cleanBlock:cleanBlock,drawTable:drawTable,drawHorizontalRule:drawHorizontalRule,undo:undo,redo:redo,toggleSideBySide:toggleSideBySide,toggleFullScreen:toggleFullScreen},shortcuts={toggleBold:"Cmd-B",toggleItalic:"Cmd-I",drawLink:"Cmd-K",toggleHeadingSmaller:"Cmd-H",toggleHeadingBigger:"Shift-Cmd-H",cleanBlock:"Cmd-E",drawImage:"Cmd-Alt-I",toggleBlockquote:"Cmd-'",toggleOrderedList:"Cmd-Alt-L",toggleUnorderedList:"Cmd-L",toggleCodeBlock:"Cmd-Alt-C",togglePreview:"Cmd-P",toggleSideBySide:"F9",toggleFullScreen:"F11"},getBindingName=function(e){for(var t in bindings)if(bindings[t]===e)return t;return null},isMobile=function(){var e=!1;return function(t){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||window.opera),e},saved_overflow="",toolbarBuiltInButtons={bold:{name:"bold",action:toggleBold,className:"fa fa-bold",title:"Bold","default":!0},italic:{name:"italic",action:toggleItalic,className:"fa fa-italic",title:"Italic","default":!0},strikethrough:{name:"strikethrough",action:toggleStrikethrough,className:"fa fa-strikethrough",title:"Strikethrough"},heading:{name:"heading",action:toggleHeadingSmaller,className:"fa fa-header",title:"Heading","default":!0},"heading-smaller":{name:"heading-smaller",action:toggleHeadingSmaller,className:"fa fa-header fa-header-x fa-header-smaller",title:"Smaller Heading"},"heading-bigger":{name:"heading-bigger",action:toggleHeadingBigger,className:"fa fa-header fa-header-x fa-header-bigger",title:"Bigger Heading"},"heading-1":{name:"heading-1",action:toggleHeading1,className:"fa fa-header fa-header-x fa-header-1",title:"Big Heading"},"heading-2":{name:"heading-2",action:toggleHeading2,className:"fa fa-header fa-header-x fa-header-2",title:"Medium Heading"},"heading-3":{name:"heading-3",action:toggleHeading3,className:"fa fa-header fa-header-x fa-header-3",title:"Small Heading"},"separator-1":{name:"separator-1"},code:{name:"code",action:toggleCodeBlock,className:"fa fa-code",title:"Code"},quote:{name:"quote",action:toggleBlockquote,className:"fa fa-quote-left",title:"Quote","default":!0},"unordered-list":{name:"unordered-list",action:toggleUnorderedList,className:"fa fa-list-ul",title:"Generic List","default":!0},"ordered-list":{name:"ordered-list",action:toggleOrderedList,className:"fa fa-list-ol",title:"Numbered List","default":!0},"clean-block":{name:"clean-block",action:cleanBlock,className:"fa fa-eraser fa-clean-block",title:"Clean block"},"separator-2":{name:"separator-2"},link:{name:"link",action:drawLink,className:"fa fa-link",title:"Create Link","default":!0},image:{name:"image",action:drawImage,className:"fa fa-picture-o",title:"Insert Image","default":!0},table:{name:"table",action:drawTable,className:"fa fa-table",title:"Insert Table"},"horizontal-rule":{name:"horizontal-rule",action:drawHorizontalRule,className:"fa fa-minus",title:"Insert Horizontal Line"},"separator-3":{name:"separator-3"},preview:{name:"preview",action:togglePreview,className:"fa fa-eye no-disable",title:"Toggle Preview","default":!0},"side-by-side":{name:"side-by-side",action:toggleSideBySide,className:"fa fa-columns no-disable no-mobile",title:"Toggle Side by Side","default":!0},fullscreen:{name:"fullscreen",action:toggleFullScreen,className:"fa fa-arrows-alt no-disable no-mobile",title:"Toggle Fullscreen","default":!0},"separator-4":{name:"separator-4"},guide:{name:"guide",action:"https://simplemde.com/markdown-guide",className:"fa fa-question-circle",title:"Markdown Guide","default":!0},"separator-5":{name:"separator-5"},undo:{name:"undo",action:undo,className:"fa fa-undo no-disable",title:"Undo"},redo:{name:"redo",action:redo,className:"fa fa-repeat no-disable",title:"Redo"}},insertTexts={link:["[","](#url#)"],image:["![","](#url#)"],table:["","\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"],horizontalRule:["","\n\n-----\n\n"]},promptTexts={link:"URL for the link:",image:"URL of the image:"},blockStyles={bold:"**",code:"```",italic:"*"};SimpleMDE.prototype.markdown=function(e){if(marked){var t={};return this.options&&this.options.renderingConfig&&this.options.renderingConfig.singleLineBreaks===!1?t.breaks=!1:t.breaks=!0,this.options&&this.options.renderingConfig&&this.options.renderingConfig.codeSyntaxHighlighting===!0&&window.hljs&&(t.highlight=function(e){return window.hljs.highlightAuto(e).value}),marked.setOptions(t),marked(e)}},SimpleMDE.prototype.render=function(e){if(e||(e=this.element||document.getElementsByTagName("textarea")[0]),!this._rendered||this._rendered!==e){this.element=e;var t=this.options,i=this,o={};for(var a in t.shortcuts)null!==t.shortcuts[a]&&null!==bindings[a]&&!function(e){o[fixShortcut(t.shortcuts[e])]=function(){bindings[e](i)}}(a);o.Enter="newlineAndIndentContinueMarkdownList",o.Tab="tabAndIndentMarkdownList",o["Shift-Tab"]="shiftTabAndUnindentMarkdownList",o.Esc=function(e){e.getOption("fullScreen")&&toggleFullScreen(i)},document.addEventListener("keydown",function(e){e=e||window.event,27==e.keyCode&&i.codemirror.getOption("fullScreen")&&toggleFullScreen(i)},!1);var n,r;if(t.spellChecker!==!1?(n="spell-checker",r=t.parsingConfig,r.name="gfm",r.gitHubSpice=!1):(n=t.parsingConfig,n.name="gfm",n.gitHubSpice=!1),this.codemirror=CodeMirror.fromTextArea(e,{mode:n,backdrop:r,theme:"paper",tabSize:void 0!=t.tabSize?t.tabSize:2,indentUnit:void 0!=t.tabSize?t.tabSize:2,indentWithTabs:t.indentWithTabs===!1?!1:!0,lineNumbers:!1,autofocus:t.autofocus===!0?!0:!1,extraKeys:o,lineWrapping:t.lineWrapping===!1?!1:!0,allowDropFileTypes:["text/plain"],placeholder:t.placeholder||e.getAttribute("placeholder")||""}),t.forceSync===!0){var l=this.codemirror;l.on("change",function(){l.save()})}this.gui={},t.toolbar!==!1&&(this.gui.toolbar=this.createToolbar()),t.status!==!1&&(this.gui.statusbar=this.createStatusbar()),void 0!=t.autosave&&t.autosave.enabled===!0&&this.autosave(),this.gui.sideBySide=this.createSideBySide(),this._rendered=this.element}},SimpleMDE.prototype.autosave=function(){if(isLocalStorageAvailable()){var e=this;if(void 0==this.options.autosave.uniqueId||""==this.options.autosave.uniqueId)return void console.log("SimpleMDE: You must set a uniqueId to use the autosave feature");null!=e.element.form&&void 0!=e.element.form&&e.element.form.addEventListener("submit",function(){localStorage.removeItem("smde_"+e.options.autosave.uniqueId)}),this.options.autosave.loaded!==!0&&("string"==typeof localStorage.getItem("smde_"+this.options.autosave.uniqueId)&&""!=localStorage.getItem("smde_"+this.options.autosave.uniqueId)&&(this.codemirror.setValue(localStorage.getItem("smde_"+this.options.autosave.uniqueId)),this.options.autosave.foundSavedValue=!0),this.options.autosave.loaded=!0),localStorage.setItem("smde_"+this.options.autosave.uniqueId,e.value());var t=document.getElementById("autosaved");if(null!=t&&void 0!=t&&""!=t){var i=new Date,o=i.getHours(),a=i.getMinutes(),n="am",r=o;r>=12&&(r=o-12,n="pm"),0==r&&(r=12),a=10>a?"0"+a:a,t.innerHTML="Autosaved: "+r+":"+a+" "+n}this.autosaveTimeoutId=setTimeout(function(){e.autosave()},this.options.autosave.delay||1e4)}else console.log("SimpleMDE: localStorage not available, cannot autosave")},SimpleMDE.prototype.clearAutosavedValue=function(){if(isLocalStorageAvailable()){if(void 0==this.options.autosave||void 0==this.options.autosave.uniqueId||""==this.options.autosave.uniqueId)return void console.log("SimpleMDE: You must set a uniqueId to clear the autosave value");localStorage.removeItem("smde_"+this.options.autosave.uniqueId)}else console.log("SimpleMDE: localStorage not available, cannot autosave")},SimpleMDE.prototype.createSideBySide=function(){var e=this.codemirror,t=e.getWrapperElement(),i=t.nextSibling;i&&/editor-preview-side/.test(i.className)||(i=document.createElement("div"),i.className="editor-preview-side",t.parentNode.insertBefore(i,t.nextSibling));var o=!1,a=!1;return e.on("scroll",function(e){if(o)return void(o=!1);a=!0;var t=e.getScrollInfo().height-e.getScrollInfo().clientHeight,n=parseFloat(e.getScrollInfo().top)/t,r=(i.scrollHeight-i.clientHeight)*n;i.scrollTop=r}),i.onscroll=function(){if(a)return void(a=!1);o=!0;var t=i.scrollHeight-i.clientHeight,n=parseFloat(i.scrollTop)/t,r=(e.getScrollInfo().height-e.getScrollInfo().clientHeight)*n;e.scrollTo(0,r)},i},SimpleMDE.prototype.createToolbar=function(e){if(e=e||this.options.toolbar,e&&0!==e.length){var t;for(t=0;t<e.length;t++)void 0!=toolbarBuiltInButtons[e[t]]&&(e[t]=toolbarBuiltInButtons[e[t]]);var i=document.createElement("div");i.className="editor-toolbar";var o=this,a={};for(o.toolbar=e,t=0;t<e.length;t++)if(("guide"!=e[t].name||o.options.toolbarGuideIcon!==!1)&&!(o.options.hideIcons&&-1!=o.options.hideIcons.indexOf(e[t].name)||("fullscreen"==e[t].name||"side-by-side"==e[t].name)&&isMobile())){if("|"===e[t]){for(var n=!1,r=t+1;r<e.length;r++)console.log(r),"|"===e[r]||o.options.hideIcons&&-1!=o.options.hideIcons.indexOf(e[r].name)||(console.log(e[r]),n=!0);if(!n)continue}!function(e){var t;t="|"===e?createSep():createIcon(e,o.options.toolbarTips,o.options.shortcuts),e.action&&("function"==typeof e.action?t.onclick=function(){e.action(o)}:"string"==typeof e.action&&(t.href=e.action,t.target="_blank")),a[e.name||e]=t,i.appendChild(t)}(e[t])}o.toolbarElements=a;var l=this.codemirror;l.on("cursorActivity",function(){var e=getState(l);for(var t in a)!function(t){var i=a[t];e[t]?i.className+=" active":"fullscreen"!=t&&"side-by-side"!=t&&(i.className=i.className.replace(/\s*active\s*/g,""))}(t)});var s=l.getWrapperElement();return s.parentNode.insertBefore(i,s),i}},SimpleMDE.prototype.createStatusbar=function(e){e=e||this.options.status;var t=this.options,i=this.codemirror;if(e&&0!==e.length){var o,a,n,r=[];for(o=0;o<e.length;o++)if(a=void 0,n=void 0,"object"==typeof e[o])r.push({className:e[o].className,defaultValue:e[o].defaultValue,onUpdate:e[o].onUpdate});else{var l=e[o];"words"===l?(n=function(e){e.innerHTML="0"},a=function(e){e.innerHTML=wordCount(i.getValue())}):"lines"===l?(n=function(e){e.innerHTML="0"},a=function(e){e.innerHTML=i.lineCount()}):"cursor"===l?(n=function(e){e.innerHTML="0:0"},a=function(e){var t=i.getCursor();e.innerHTML=t.line+":"+t.ch}):"autosave"===l&&(n=function(e){void 0!=t.autosave&&t.autosave.enabled===!0&&e.setAttribute("id","autosaved")}),r.push({className:l,defaultValue:n,onUpdate:a})}var s=document.createElement("div");for(s.className="editor-statusbar",o=0;o<r.length;o++){var c=r[o],d=document.createElement("span");d.className=c.className,"function"==typeof c.defaultValue&&c.defaultValue(d),"function"==typeof c.onUpdate&&this.codemirror.on("update",function(e,t){return function(){t.onUpdate(e)}}(d,c)),s.appendChild(d)}var g=this.codemirror.getWrapperElement();return g.parentNode.insertBefore(s,g.nextSibling),s}},SimpleMDE.prototype.value=function(e){return void 0===e?this.codemirror.getValue():(this.codemirror.getDoc().setValue(e),this)},SimpleMDE.toggleBold=toggleBold,SimpleMDE.toggleItalic=toggleItalic,SimpleMDE.toggleStrikethrough=toggleStrikethrough,SimpleMDE.toggleBlockquote=toggleBlockquote,SimpleMDE.toggleHeadingSmaller=toggleHeadingSmaller,SimpleMDE.toggleHeadingBigger=toggleHeadingBigger,SimpleMDE.toggleHeading1=toggleHeading1,SimpleMDE.toggleHeading2=toggleHeading2,SimpleMDE.toggleHeading3=toggleHeading3,SimpleMDE.toggleCodeBlock=toggleCodeBlock,SimpleMDE.toggleUnorderedList=toggleUnorderedList,SimpleMDE.toggleOrderedList=toggleOrderedList,SimpleMDE.cleanBlock=cleanBlock,SimpleMDE.drawLink=drawLink,SimpleMDE.drawImage=drawImage,SimpleMDE.drawTable=drawTable,SimpleMDE.drawHorizontalRule=drawHorizontalRule,SimpleMDE.undo=undo,SimpleMDE.redo=redo,SimpleMDE.togglePreview=togglePreview,SimpleMDE.toggleSideBySide=toggleSideBySide,SimpleMDE.toggleFullScreen=toggleFullScreen,SimpleMDE.prototype.toggleBold=function(){toggleBold(this)},SimpleMDE.prototype.toggleItalic=function(){toggleItalic(this)},SimpleMDE.prototype.toggleStrikethrough=function(){toggleStrikethrough(this)},SimpleMDE.prototype.toggleBlockquote=function(){toggleBlockquote(this)},SimpleMDE.prototype.toggleHeadingSmaller=function(){toggleHeadingSmaller(this)},SimpleMDE.prototype.toggleHeadingBigger=function(){toggleHeadingBigger(this)},SimpleMDE.prototype.toggleHeading1=function(){toggleHeading1(this)},SimpleMDE.prototype.toggleHeading2=function(){toggleHeading2(this)},SimpleMDE.prototype.toggleHeading3=function(){toggleHeading3(this)},SimpleMDE.prototype.toggleCodeBlock=function(){toggleCodeBlock(this)},SimpleMDE.prototype.toggleUnorderedList=function(){toggleUnorderedList(this)},SimpleMDE.prototype.toggleOrderedList=function(){toggleOrderedList(this)},SimpleMDE.prototype.cleanBlock=function(){cleanBlock(this)},SimpleMDE.prototype.drawLink=function(){drawLink(this)},SimpleMDE.prototype.drawImage=function(){drawImage(this)},SimpleMDE.prototype.drawTable=function(){drawTable(this)},SimpleMDE.prototype.drawHorizontalRule=function(){drawHorizontalRule(this)},SimpleMDE.prototype.undo=function(){undo(this)},SimpleMDE.prototype.redo=function(){redo(this)},SimpleMDE.prototype.togglePreview=function(){togglePreview(this)},SimpleMDE.prototype.toggleSideBySide=function(){toggleSideBySide(this)},SimpleMDE.prototype.toggleFullScreen=function(){toggleFullScreen(this)},SimpleMDE.prototype.isPreviewActive=function(){var e=this.codemirror,t=e.getWrapperElement(),i=t.lastChild;return/editor-preview-active/.test(i.className)},SimpleMDE.prototype.isSideBySideActive=function(){var e=this.codemirror,t=e.getWrapperElement(),i=t.nextSibling;return/editor-preview-active-side/.test(i.className)},SimpleMDE.prototype.isFullscreenActive=function(){var e=this.codemirror;return e.getOption("fullScreen")},SimpleMDE.prototype.getState=function(){var e=this.codemirror;return getState(e)},SimpleMDE.prototype.toTextArea=function(){var e=this.codemirror,t=e.getWrapperElement();t.parentNode.removeChild(this.gui.toolbar),t.parentNode.removeChild(this.gui.statusbar),t.parentNode.removeChild(this.gui.sideBySide),e.toTextArea(),this.autosaveTimeoutId&&(clearTimeout(this.autosaveTimeoutId),this.autosaveTimeoutId=void 0,this.clearAutosavedValue())},module.exports=SimpleMDE,define("src/js/simplemde",function(){});