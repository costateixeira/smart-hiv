document.addEventListener("DOMContentLoaded", function() {
    const configElement = document.getElementById("feedback-config");
    if (!configElement) return; // Ensure the config exists before proceeding
  
    const repoOwner = configElement.dataset.repoOwner;
    const repoName = configElement.dataset.repoName;
    const repoSource = configElement.dataset.repoSource;
    const issueLabel = configElement.dataset.issueLabel || "feedback";
    const issueTemplate = "feedback.yml";

    document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]").forEach(heading => {
      const sectionId = heading.id;
      const sectionName = heading.textContent.trim();
  
      const feedbackLink = document.createElement("a");
      feedbackLink.href = "#";
      feedbackLink.textContent = "Feedback ";
      feedbackLink.classList.add("feedback");
  
      feedbackLink.onclick = (e) => {
        e.preventDefault();
        openGitHubIssue(sectionName, sectionId);
      };
  
      heading.appendChild(feedbackLink);
    });
  
    function openGitHubIssue(sectionName, sectionId) {
      const pageTitle = document.title;
      const pageUrl = window.location.href;
      const issueTitle = `Feedback on: ${sectionName}`;
  
      const body = `### Section\n${sectionName}\n\n### Page\n[${pageTitle}](${pageUrl})\n\n[Direct Link to Section](${pageUrl}#${sectionId})\n\n### Feedback\n(please describe your feedback here)`;
  
      const issueUrl = `${repoSource}/issues/new?` +
//        `template=${encodeURIComponent(issueTemplate)}` +
        `title=${encodeURIComponent(issueTitle)}&` +
        `labels=${encodeURIComponent(issueLabel)}&` +
        `body=${encodeURIComponent(body)}`;
  
      window.open(issueUrl, "_blank");
    }
  });
  