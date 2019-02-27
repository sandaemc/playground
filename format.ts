import { PullRequest } from "./types";

export function openPRsFormattedMessage(prs: PullRequest[]) {
  const messages: string[] = ["*Open PRs*\n\n"];
  const members = new Set(prs.map(pr => pr.owner));

  for (const member of members) {
    const memberPRs = prs.filter(pr => pr.owner === member);
    if (!memberPRs.length) continue;

    messages.push(`*${member}*: \n`);

    for (const pr of memberPRs) {
      if (pr.owner !== member) continue;
      messages.push(` - ${pr.title} (${pr.link})\n`);
    }

    messages.push("\n");
  }

  return messages.join("");
}
