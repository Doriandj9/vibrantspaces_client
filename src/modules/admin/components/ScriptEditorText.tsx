import { api, app } from '@/config/app';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useScript } from 'usehooks-ts';

type renderParams = {
    getData: () => string;

};

type ScriptEditorProps = {
    render: (value: string, status: 'ready' | 'error' | 'loading' | 'idle') => React.ReactNode;
};

export const ScriptEditor: React.FC<ScriptEditorProps> = ({ render }) => {
    // Load the script asynchronously
    const [html, setHtml] = useState<null | string>(null);

    const status = useScript(`https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js`, {
        removeOnUnmount: true,
        id: 'editor-text',
    });

    useEffect(() => {
        let editorDeploy: unknown;
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
                            'alignment', 'blockQuote', '|',
                            'imageUpload', 'mediaEmbed', '|',
                        ],
                        table: {
                            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                        },
                        extraPlugins: [MyCustomUploadAdapterPlugin]
                    })
                    .then((newEditor: renderParams) => {
                        editorData = newEditor;
                        editorDeploy = newEditor;
                    })
                    .catch((error: Error) => {
                        console.error('Error initializing CKEditor:', error);
                        toast.error(error.message);
                    });
                document.getElementById('btn-sn')?.addEventListener('click', () => {
                    setHtml(editorData?.getData() ?? '');
                });
            }
        }

        return () => {
            console.log(editorDeploy);
        };
        
    }, [status]);
    return (
        <div id='editor-content' className='max-w-full'>
            <textarea id="editor" className='max-w-full'></textarea>
            {render(html ?? '', status)}
        </div>
    );
};

type LoaderType = {
    file:  Promise<File>;
};
class MyUploadAdapter {
    private loader: LoaderType;

    constructor(loader: LoaderType) {
        console.log('MyUploadAdapter constructor called', loader);
        this.loader = loader;
    }

    upload(): Promise<{ default: string }> {
        return this.loader.file
            .then((file: File) => new Promise((resolve, reject) => {
                const data = new FormData();
                data.append('upload', file);

                api.post('/upload', data,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((res) => {
                        const path = app.host + res.data.data as string;
                        console.log('File uploaded successfully:', path);
                        resolve({
                            default: path
                        });
                    })
                    .catch(err => {
                        reject(`Upload failed: ${err.message}`);
                    });
            }));
    }

    abort(): void {
       console.log('Upload aborted');
    }
}

type EditorType = {
    plugins: {
        get: (pluginName: string) => {
            createUploadAdapter: (loader: LoaderType) => MyUploadAdapter;
        };
    };
    ui: {
        componentFactory: {
            add: (name: string, callback: (locale: unknown) => unknown) => void;
        };
        button: {
            ButtonView: {
                new (locale: unknown): {
                    set: (options: { label: string; withText: boolean; icon: string; tooltip: boolean }) => void;
                    on: (eventName: string, callback: () => void) => void;
                };
            };
        };
    };
    model: {
        change: (callback: (writer: Writer) => void) => void;
        document: {
            selection: {
                getFirstPosition: () => unknown;
            };
        };
        insertContent: (content: unknown, position: unknown) => void;
    };
};

function MyCustomUploadAdapterPlugin(editor: EditorType): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: LoaderType) => {
        return new MyUploadAdapter(loader);
    };
}

type CreateTextFn = {
    (linkTxt: string, config: {linkHref: string}): void;
};

type Writer = {
    createText: CreateTextFn;
};
