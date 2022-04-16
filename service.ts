import * as grpc from "@grpc/grpc-js";
import { ImgBuilder } from "./img";
import { pb } from "./proto/canvas";

export const CanvasServiceImpl = {
  GenImg: (
    call: grpc.ServerUnaryCall<pb.ImgRequest, pb.ImgResponse>,
    callback: grpc.sendUnaryData<pb.ImgResponse>
  ) => {
    const imgBuiler = new ImgBuilder(
      call.request.width,
      call.request.height,
      call.request.type,
      call.request.data
    );

    const buffer = imgBuiler.GetPNGBuffer();

    callback(null, new pb.ImgResponse({ data: buffer }));
  },
};