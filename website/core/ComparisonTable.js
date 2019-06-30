const React = require('react');
const CompLibrary = require('../node_modules/docusaurus/lib/core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock;

const rows = [
    {
        title: 'Invalid pattern<sup>(eg. `/unclosed[A-/`)</sup>',
        php: 'Issues a warning',
        tRegx: '`MalformedPatternException` with descriptive message'
    },
    {
        title: 'Corrupted subject<sup>(eg. malformed utf-8 sequence)</sup>',
        php: `
* Different methods return different error values (\`false\`, \`null\` or \`[]\`)
* \`preg_last_error()\` returns error code`,
        tRegx: '`RuntimeCleanRegexException` with descriptive message'
    },
    {
        title: 'Overly complex pattern<sup>(eg. containing `?R`)</sup>',
        php: `
* No warning
* \`preg_last_error()\` returns error code
        `,
        tRegx: '`RuntimeSafeRegexException` with descriptive message'
    },
    {
        title: `Returning an invalid replacement value`,
        php: `
 - \`preg_last_error()\` returns **success** code <sup>(returns \`PREG_NO_ERROR\`)</sup>
 - Silently converts the value to string <sup>(e.g. \`integer\`)<sup>
 - Raises a warning <sup>(e.g. \`array\`)<sup>
 - Throws a fatal error, terminating the application <sup>(e.g. \`stdClass\`, objects without \`__toString\`)<sup>`,
        tRegx: '`InvalidReplacementException` with descriptive message'
    },
    {
        title: `Using an invalid capturing group name<sup>(eg. name \`!@#$\`, index \`-2\`)</sup>`,
        php: 'Actually tries to get the group',
        tRegx: '`InvalidArgumentException` with descriptive message'
    },
    {
        title: `Using a nonexistent group<sup>(group name typo, group deleted)</sup>`,
        php: 'Actually tries to get the group',
        tRegx: '`NonexistentGroupException` with descriptive message'
    },
    {
        title: `Using an un-matched group<sup>(conditional group, unmatched by subject)`,
        php: 'Actually tries to get the group',
        tRegx: '`GroupNotMatchedException` with descriptive message'
    },
    {
        title: `Offsets in UTF-8<sup>(eg. 18€)</sup>`,
        php: 'In bytes<sup>5 bytes</sup>',
        tRegx: ` - Method \`offset()\` - 3 characters
 - Method \`byteOffset()\` - 5 bytes`
    },
    {
        title: `Worst case complexity`,
        php: '`(string|int|null)[][][]`<sup>array of arrays of arrays of string/null and integer - `preg_match_all()` with `PREG_OFFSET_CAPTURE`</sup>',
        tRegx: '`string[]`<sup>array of strings</sup>'
    }
];

function mapToMarkdown(rows) {
    return rows.map((row, index) => {
        return <tr key={index}>
            <td><MarkdownBlock>{row.title}</MarkdownBlock></td>
            <td><MarkdownBlock>{row.php}</MarkdownBlock></td>
            <td><MarkdownBlock>{row.tRegx}</MarkdownBlock></td>
        </tr>
    });
}

const ComparisonTable = () => {
    const children = mapToMarkdown(rows);
    return (
        <table className='comparison-table' width="100%" border="0" cellSpacing="0" cellPadding="0">
            <thead>
            <tr>
                <th/>
                <th>Plain PHP</th>
                <th>T-Regx</th>
            </tr>
            <tr className="logo-row">
                <th/>
                <th><img src={"/img/comparison/php.png"} alt="Plain PHP"/></th>
                <th><img src={"/img/t.regx.png"} alt="T-Regx"/></th>
            </tr>
            </thead>
            <tbody>
            {children}
            </tbody>
        </table>
    )
};

module.exports = ComparisonTable;