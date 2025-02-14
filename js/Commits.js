const manualOverride = false; // Set to true to override the date manually.
const overrideDate = "September 2, 2025 at 3:10 PM"; // Manually set date.

async function getLastCommitDate(owner, repo) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;

    if (manualOverride) {
        document.getElementById('commit-date').textContent = `Last Update: ${overrideDate}`;
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API responded with status ${response.status}`);
        }

        const commits = await response.json();
        const lastCommitDate = new Date(commits[0].commit.author.date);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };

        document.getElementById('commit-date').textContent = `Last Update: ${lastCommitDate.toLocaleDateString(undefined, options)}`;
    } catch (error) {
        document.getElementById('commit-date').textContent = `Error fetching commit date: ${error.message}`;
    }
}

getLastCommitDate('GoobisMoobis', 'ihatelinewize');
