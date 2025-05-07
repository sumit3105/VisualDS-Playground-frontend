const { createVisualisation, vArray, vElement, mergeSort, bubbleSort, insertionSort, selectionSort, linearSearch, binarySearch } = window.VisualDS

// require.config( { paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.38.0/min/vs' } } );

// window.editor = null
// require( [ 'vs/editor/editor.main' ], function ()
// {

//         // Fetch custom IntelliSense definitions from an external file
//         fetch( 'https://zalaharshpalsinh.github.io/VisualDS/dist/VisualDS.d.ts' )
//                 .then( response =>
//                 {
//                         return response.text()
//                 } )
//                 .then( customDefinitions =>
//                 {
//                         // customDefinitions
//                         var libUri = "ts:filename/visualds.d.ts";
//                         monaco.languages.typescript.javascriptDefaults.addExtraLib( customDefinitions, libUri );
//                         // When resolving definitions and references, the editor will try to use created models.
//                         // Creating a model for the library allows "peek definition/references" commands to work with the library.
//                         monaco.editor.createModel( customDefinitions, "typescript", monaco.Uri.parse( libUri ) );
//                         window.editor = monaco.editor.create( document.getElementById( 'editor-container' ), {
//                                 value: 'let arr = new vArray([10,5,3,7,2,8,2,1]);',
//                                 language: 'javascript',
//                                 theme: 'vs-dark',
//                                 automaticLayout: true
//                         } );

//                 } )
//                 .catch( error => console.log( 'Failed to load .d.ts file:', error ) );


//         document.getElementById( 'run-btn' ).addEventListener( 'click', () =>
//         {
//                 const userCode = window.editor.getValue();
//                 const userScript = new Function( [ 'controller' ], userCode );
//                 console.log( userScript )
//                 createVisualisation( 'visualization-canvas', userScript );
//         } );
// } );

document.getElementById( 'run-btn' ).addEventListener( 'click', () =>
{
        const userCode = window.editor.getValue();
        const userScript = new Function( [ 'controller' ], userCode );
        console.log( userScript )
        createVisualisation( 'visualization-canvas', userScript );
} );