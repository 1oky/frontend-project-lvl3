const parser = (xml) => {
    const parser = new DOMParser();
    const parsedDoc = parser.parseFromString(xml, 'text/xml');
    if (parsedDoc.querySelector('parsererror')) {
        throw new Error('parsererror');
    }
    const channel = parsedDoc.querySelector('channel')
    const channelItems = [...channel.querySelectorAll('item')]
    const pageTitle = channel.querySelectorAll('title').textContent;
    const pageDescription = channel.querySelectorAll('description').textContent;
    const pageLink = channel.querySelectorAll('link').textContent;
    const infoItems = [...channelItems].map((item) => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const description = item.querySelector('description').textContent;
        description.trim();
        return { title, link, description }
    })
    return { 
        feedInfo: { pageTitle, pageDescription, pageLink },
        infoItems,
    }
};
export default parser;