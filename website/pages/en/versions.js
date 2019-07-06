const React = require('react');
const CompLibrary = require('../../core/CompLibrary');
const Container = CompLibrary.Container;
const CWD = process.cwd();
const versions = require(`${CWD}/versions.json`);
const metaDescription = require(`${process.cwd()}/core/MetaDescription`);

function Versions(props) {
    const {config: siteConfig} = props;
    const latestVersion = versions[0];
    const repoUrl = siteConfig.mainRepoUrl;
    return (
        <div className="docMainWrapper wrapper">
            <Container className="mainContainer versionsContainer">
                <div className="post">
                    <header className="postHeader">
                        <h1>{siteConfig.title} Versions</h1>
                    </header>
                    <h3 id="latest">Current versions</h3>
                    <table className="versions">
                        <tbody>
                        <tr>
                            <th>dev-master</th>
                            <td>
                                <a href={`${siteConfig.baseUrl}${siteConfig.docsUrl}/next/installation`}>
                                    Documentation
                                </a>
                                &nbsp;for upcoming, not yet released features
                            </td>
                            <td>
                                <a href={repoUrl} target="_blank">Source Code</a>
                            </td>
                        </tr>
                        </tbody>
                        <tr>
                            <th>{latestVersion} (current)</th>
                            <td>
                                <a href={`${siteConfig.baseUrl}${siteConfig.docsUrl}/installation`}>
                                    Documentation
                                </a>
                                &nbsp;for the current release
                            </td>
                            <td>
                                <a href={`${repoUrl}/releases/tag/v${latestVersion}`} target="_blank">
                                    Release Notes
                                </a>
                            </td>
                        </tr>
                    </table>

                    <h3 id="archive">Past Versions</h3>
                    <p>
                        Here you can find documentation for previous versions of Docusaurus.
                    </p>
                    <table className="versions">
                        <tbody>
                        {versions
                            .filter(version => version !== latestVersion)
                            .map(version =>
                                <tr key={version}>
                                    <th>{version}</th>
                                    <td>
                                        <a href={`${siteConfig.baseUrl}${siteConfig.docsUrl}/${version}/installation`}>
                                            Documentation
                                        </a>
                                        &nbsp;for {version}
                                    </td>
                                    <td>
                                        <a href={`${repoUrl}/releases/tag/v${version}`} target="_blank">
                                            Release Notes
                                        </a>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <p>
                        You can find past versions of this project on{' '}
                        <a href={`${repoUrl}/releases`} target="_blank">GitHub</a>.
                    </p>
                </div>
            </Container>
        </div>
    );
}

Versions.title = 'Versions';
Versions.description = metaDescription;

module.exports = Versions;