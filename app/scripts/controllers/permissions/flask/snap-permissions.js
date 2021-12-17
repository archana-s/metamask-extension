import { restrictedMethodBuilders, selectHooks } from '@metamask/rpc-methods';
import { endowmentBuilders } from '@metamask/snap-controllers';

/**
 * @returns {Record<string, Record<string, unknown>>} All endowment permission
 * specifications.
 */
export const buildSnapEndowmentSpecifications = () =>
  Object.values(endowmentBuilders.builders).reduce(
    (allSpecifications, { targetKey, specificationBuilder }) => {
      allSpecifications[targetKey] = specificationBuilder();
      return allSpecifications;
    },
    {},
  );

/**
 * @typedef {Object} SnapPermissionSpecificationHooks
 * @property {Function} addSnap
 * @property {Function} clearSnapState
 * @property {Function} getMnemonic
 * @property {Function} getSnap
 * @property {Function} getSnapRpcHandler
 * @property {Function} getSnapState
 * @property {Function} showConfirmation
 * @property {Function} updateSnapState
 */

/**
 * @param {SnapPermissionSpecificationHooks} hooks - The hooks for the Snap
 * restricted method implementations.
 */
export function buildSnapRestrictedMethodSpecifications(hooks) {
  return Object.values(restrictedMethodBuilders).reduce(
    (specifications, { targetKey, specificationBuilder, methodHooks }) => {
      specifications[targetKey] = specificationBuilder({
        methodHooks: selectHooks(hooks, methodHooks),
      });
      return specifications;
    },
    {},
  );
}
