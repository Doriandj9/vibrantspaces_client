import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useScript } from 'usehooks-ts';

type renderParams = {
    getData: () => string;

};

type ScriptEditorProps = {
    render: (value: string, status: 'ready'|'error'|'loading'|'idle' ) => React.ReactNode;
};

export const ScriptEditor: React.FC<ScriptEditorProps> = ({render}) => {
    // Load the script asynchronously
    const [html, setHtml] = useState<null | string>(null);

    const status = useScript(`https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js`, {
        removeOnUnmount: true,
        id: 'editor-text',
    });

    useEffect(() => {
        if (status === 'ready') {
            if (Reflect.has(window, 'ClassicEditor')) {
                const classicEditor = Reflect.get(window, 'ClassicEditor');
                let editorData: renderParams | null;
                classicEditor
                    .create(document.querySelector('#editor'), {
                        toolbar: [
                            'undo', 'redo', '|',
                            'heading', '|',
                            'bold', 'italic', 'underline', '|',
                            'bulletedList', 'numberedList', '|',
                            'insertTable', '|',
                            'alignment', 'blockQuote', 'link'
                        ],
                        table: {
                            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                        }
                    })
                    .then((newEditor: renderParams) => {
                        editorData = newEditor;
                    })
                    .catch((error: Error) => {
                        toast.error(error.message);
                    });
                document.getElementById('btn-sn')?.addEventListener('click', () => {
                    setHtml(editorData?.getData() ?? '');
                });
            }
        }
    }, [status]);
    return (
        <div id='editor-content' className='max-w-full'>
            <textarea id="editor" className='max-w-full'></textarea>
            {render(html ?? '', status)}
        </div>
    );
};