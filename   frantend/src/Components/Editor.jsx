import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Editor = (data) => {
    const [editorData, setEditorData] = useState('');

    return (
        <div className={data.className}>
      
            <div
                className="ckeditor-container overflow-scroll"
                style={{ width: '100%', minHeight: '300px' }} // Inline styles for width and height
            >
                <CKEditor
                    editor={ClassicEditor}
                    data={editorData}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorData(data);
                        console.log({ event, editor, data });
                    }}
                />
            </div>
        </div>
    );
}

export default Editor;
