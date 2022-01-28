import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default function TextEnrich(props) {
        return (
                <CKEditor
                    editor={ ClassicEditor }
                    data={props.description}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        props.setDescription(data)
                    } }
                />
        );
}
