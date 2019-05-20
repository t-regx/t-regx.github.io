const React = require('react');
const CompLibrary = require('../node_modules/docusaurus/lib/core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock;

const rows = [
    {
        title: 'Invalid pattern<sup>(eg. `/unclosed[A-/`)</sup>',
        php: 'Issues a warning',
        tRegx: 'throws `InvalidPatternException` with descriptive error message'
    },
    {
        title: 'Corrupted subject<sup>(eg. malformed utf-8 sequence)</sup>',
        php: `
* Different methods return different error values (\`false\`, \`null\` or \`[]\`)
* \`preg_last_error()\` returns error code`,
        tRegx: 'throws `RuntimeCleanRegexException` with descriptive error message'
    },
    {
        title: 'Overly complex pattern<sup>(eg. containing `?R`)</sup>',
        php: `
* No warning
* \`preg_last_error()\` returns error code
        `,
        tRegx: 'throws `RuntimeSafeRegexException` with descriptive error message'
    },
    {
        title: `Using invalid capturing group name<sup>(eg. name \`!@#$\`, index \`-2\`)</sup>`,
        php: 'Actually tries to get the group',
        tRegx: 'throws `InvalidArgumentException` with descriptive message'
    },
    {
        title: `Using a nonexistent group<sup>(one that was not used in the pattern)</sup>`,
        php: 'Actually tries to get the group',
        tRegx: 'throws `NonexistentGroupException` with descriptive message'
    },
    {
        title: `Offsets in UTF-8<sup>(eg. 18€)</sup>`,
        php: 'In bytes<sup>5 bytes</sup>',
        tRegx: 'In characters<sup>3 characters</sup>'
    },
    {
        title: `Worst case complexity`,
        php: `array of arrays of arrays of string/null and integer<sup>preg_match_all() with PREG_OFFSET_CAPTURE</sup>`,
        tRegx: 'array of strings<sup>All matches or all groups</sup>'
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