# the backend-side: Writing Style Guide

## The voice: Straight Talk

Write like an experienced architect talking to a potential partner: direct, opinionated, warm, and able to back every claim. The goal is to make the right people want to work with you.

The reader may want to hire you, fund a project, build with you or learn with you. Assume they are smart and busy, but not necessarily engineers.

1. **Lead with the stake.** Open with the problem, number or opinion that makes the rest worth reading.
2. **Have a position.** Say what you would do and when you would not.
3. **Show the receipts.** Follow each opinion with a reason, example, number or diagram.
4. **Name the trade-off.** Every decision costs something. Say what.
5. **Raise one eyebrow.** Use dry humor about situations and engineering habits, never about people or clients.
6. **End with a door.** Close with a question or a specific way to work together.

The core voice borrows its rigor from the Field Report: when the text turns technical, slow down and be exact.

## Do and don't

Prefer the concrete sentence over the impressive one. The examples show phrasing only; they are not approved claims.

| Rule                | Instead of                               | Write                                                                 |
| ------------------- | ---------------------------------------- | --------------------------------------------------------------------- |
| Be specific         | We built a highly performant system.     | The target was under 10 ms, end to end.                               |
| Use active verbs    | The architecture was reviewed.           | I reviewed the architecture.                                          |
| Have a position     | There are many ways to approach caching. | I add a cache last, after I know what is slow.                        |
| Price the trade-off | This design is highly available.         | This design buys availability and pays for it in latency.             |
| Cut the buzzwords   | I leverage cutting-edge cloud synergies. | I help teams run cloud systems that cost less and break less.         |
| Earn the humor      | Kubernetes, am I right?                  | A cluster that scales to thousands of nodes can also scale your bill. |
| Invite, don't beg   | Please do not hesitate to contact me.    | Have a system with numbers like these? Let's talk.                    |

- **Person:** "I" for your opinions and work, "you" for the reader, "we" only for work a team did.
- **Rhythm:** mostly short sentences, with a longer one when the reasoning needs room. Paragraphs of up to three sentences.
- **Punctuation:** at most one exclamation mark per page. No emoji.
- **Spelling:** American English.

## Tone and structure by page

The voice stays the same across the site; only the intensity changes.

| Page                | Humor          | Opinion | Closes with                                  |
| ------------------- | -------------- | ------- | -------------------------------------------- |
| About               | Medium         | Medium  | What you want to work on next                |
| Services            | Low            | High    | A clear way to contact you                   |
| Delivered project   | Low            | Medium  | The result and a related service             |
| In-progress project | Medium         | Medium  | Current status and what help is wanted       |
| Idea                | Medium         | High    | What is untested and who should get in touch |
| Blog post           | Medium to high | High    | A question or an invitation                  |

### Project descriptions

Start with a summary of 60 to 100 words, then expand in this order.

1. **The stake:** what had to be true, and why it was hard.
2. **Your role:** what you did, separate from what the team did.
3. **The constraints:** numbers, deadlines, budget, legacy.
4. **The decisions:** options considered, choice made, price paid. Add the diagram here.
5. **The outcome:** verified results, or the current status.
6. **What I would do differently.**
7. **The door:** how this experience can help the reader.

### Blog posts

Open with a hook, state your position in the first three paragraphs, then prove it. Use headings a skimming reader can follow, and finish with the trade-off and an invitation.

## Facts, confidentiality and translation

Nothing is published as fact unless you have confirmed it and are allowed to say it.

- Keep "designed for", "targeted" and "measured" distinct.
- Never invent metrics, clients, dates, quotes or anecdotes. Use a visible `TODO:` instead.
- Name a client or show its logo only with permission. Otherwise describe the industry, if that is allowed.
- Leave out internal diagrams, incident details and costs that your agreements protect.
- On crypto and other investments, share research and experience, not recommendations.

### Writing for English, Spanish and Polish

English is the source text. Translations adapt the joke and keep the facts.

- Avoid puns, sports metaphors and culture-bound idioms.
- Keep one idea per sentence and one term per concept.
- Leave established technical terms and product names in English where that is the local habit.
- Allow headings and buttons to grow in translation.
- Have a fluent speaker review Polish before it goes live.

## How we write together

You bring the facts and the opinions; Claude shapes and challenges them; you approve every word.

1. You send raw notes in any language, however messy.
2. Claude asks for the missing facts and drafts in English.
3. You correct facts and mark phrases that don't sound like you.
4. Claude revises, then translates once the English is approved.
5. Approved content goes to Copilot for implementation.

### Claude as your challenger

Before polishing any blog post, Claude reviews its substance and says plainly what is not good enough yet.

| Claude checks for                                       | What Claude asks of you                                       |
| ------------------------------------------------------- | ------------------------------------------------------------- |
| Weak quality: no clear position, flat hook, shaky logic | Sharpen the argument or rework the section                    |
| Thin evidence: a claim without proof                    | Add a number, example, source or diagram, or soften the claim |
| Unclear topics: skipped steps, unexplained terms        | Clarify for a smart reader who was not there                  |
| Tangents: interesting but off the main point            | Cut it, or save it for its own post                           |
| Over-elaboration or repetition                          | Say it once, in the strongest place                           |

Each review lists the most important problems first, with the reason and a suggested fix. You can disagree; the facts and the final call are yours, but an unproven claim stays out.

### Before publishing

- [ ] The first two sentences give a reason to keep reading
- [ ] Every claim is confirmed and allowed to be public
- [ ] Each opinion has a reason and a trade-off
- [ ] A non-engineer can follow the summary
- [ ] You would say it out loud to a potential partner
- [ ] The page ends with a clear next step
