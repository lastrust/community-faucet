import {
  recoverTypedSignature,
  SignTypedDataVersion,
  TypedMessage,
} from "@metamask/eth-sig-util";
import { DropRequestType, DropTypes, FAUCET_DOMAIN } from "src/types";

export const createDropRequestParam = (
  message: DropRequestType
): TypedMessage<typeof DropTypes> => {
  return {
    types: DropTypes,
    primaryType: "DropRequest",
    domain: FAUCET_DOMAIN,
    message,
  };
};

export const recoverDropRequest = (
  message: DropRequestType,
  signature: string
) => {
  const typedMessage = createDropRequestParam(message);
  const signer = recoverTypedSignature({
    data: typedMessage,
    signature,
    version: SignTypedDataVersion.V4,
  });
  return signer;
};
