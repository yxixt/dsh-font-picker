/**
 * dsh-font-picker — Host entry.
 *
 * The plugin has no Host-side behaviour: every feature lives in the client
 * bundle (`lib/client.js`), which talks to the `theme` service provided by
 * `@deepseek-ai/dsh-client-ui-theme`. The Host row exists so the profile loader
 * mounts the package and the Web runtime serves its client entry.
 *
 * @module dsh-font-picker
 */

/** Cordis plugin name. */
export const name = 'dsh-font-picker';

/**
 * Mount the plugin. Nothing to do on the Host: the Web runtime discovers the
 * client entry through this package's `dsh.client` manifest and the `./client`
 * export, and the client plugin owns the whole feature.
 */
export function apply() {
  // Intentionally empty — see the module comment.
}
