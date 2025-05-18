import juice from 'juice';


export const mergeCssHtml = (content: string) => {

    const styles = `
    <style>
    blockquote {
        border-left: 5px solid #ccc;
        font-style: italic;
        margin-left: 0;
        margin-right: 0;
        overflow: hidden;
        padding-left: 1.5em;
        padding-right: 1.5em;
    }
    p{
    color: black;
    font-weight: 400;
    }
    ol, ul {
        margin-left: 1.5rem;
    }
    table {
    overflow: hidden;
    }
    table {
        border: 1px double #b3b3b3;
        border-collapse: collapse;
        border-spacing: 0;
        height: 100%;
        width: 100%;
        color: black;
    }
    table td, table th {
    border: 1px solid #bfbfbf;
    min-width: 2em;
    padding: .4em;
    }
    td, th {
        overflow-wrap: break-word;
        position: relative;
    }
    .ck-editor__editable .ck-table-bogus-paragraph {
    display: inline-block;
    width: 100%;
    }
    

    .ck.ck-editor__editable_inline>:last-child {
    margin-bottom: calc(0.6em*1.5);
    }
    .ck.ck-editor__editable_inline>:first-child {
            margin-top: calc(0.6em*1.5);
    }
    </style>
    `;

    return juice(styles + content, {

    });

};