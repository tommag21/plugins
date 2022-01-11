import {
	CircleOptions, Coordinate, CoordinateBounds,
	GroundOverlayOptions,
	MarkerOptions,
	PolygonOptions,
	PolylineOptions, TileOverlayOptions,
} from "../";
import {Color, ImageSource, Utils} from "@nativescript/core";
import {intoNativeColor} from "./common";
import {JointType} from '../common';

export function hueFromColor(color: Color | number) {
	const colors = Array.create('float', 3);
	if (typeof color === 'number') {
		android.graphics.Color.colorToHSV(color, colors);
	} else {
		android.graphics.Color.colorToHSV(color.android, colors);
	}

	return colors[0];
}

export function toJointType(type: number): JointType {
	switch (type) {
		case com.google.android.gms.maps.model.JointType.ROUND:
			return JointType.Round;
		case com.google.android.gms.maps.model.JointType.BEVEL:
			return JointType.Bevel;
		default:
			return JointType.Default;
	}
}

export function intoNativeJointType(type: JointType): number {
	switch (type) {
		case JointType.Round:
			return com.google.android.gms.maps.model.JointType.ROUND;
		case JointType.Bevel:
			return com.google.android.gms.maps.model.JointType.BEVEL;
		default:
			return com.google.android.gms.maps.model.JointType.DEFAULT;
	}
}

export function intoNativeMarkerOptions(options: MarkerOptions) {
	const opts = new com.google.android.gms.maps.model.MarkerOptions();
	if (typeof options?.draggable === 'boolean') {
		opts.draggable(options.draggable);
	}

	if (typeof options?.anchorU === 'number' || typeof options?.anchorV === 'number') {
		const anchorU = options?.anchorU ?? opts.getAnchorU();
		const anchorV = options?.anchorV ?? opts?.getAnchorV();
		opts.anchor(anchorU, anchorV);
	}

	if (options?.position) {
		opts.position(new com.google.android.gms.maps.model.LatLng(
			options.position.lat,
			options.position.lng
		));
	}

	if (options?.title) {
		opts.title(options.title);
	}

	if (options?.snippet) {
		opts.snippet(options.snippet);
	}

	if (options?.icon) {
		if (options?.icon instanceof android.graphics.Bitmap) {
			const desc = com.google.android.gms.maps.model.BitmapDescriptorFactory.fromBitmap(options.icon);
			opts.icon(desc);
		} else if (options?.icon instanceof ImageSource) {
			const desc = com.google.android.gms.maps.model.BitmapDescriptorFactory.fromBitmap(options.icon.android);
			opts.icon(desc);
		}
	}

	const color = intoNativeColor(options.color);

	if (color !== null) {
		opts.icon(
			com.google.android.gms.maps.model.BitmapDescriptorFactory.defaultMarker(
				hueFromColor(color)
			)
		)
	}

	if (typeof options?.rotation === 'number') {
		opts.rotation(options.rotation);
	}

	if (typeof options?.flat === 'boolean') {
		opts.flat(options.flat);
	}

	if (typeof options?.zIndex === 'number') {
		opts.zIndex(options.zIndex);
	}
	return opts;
}

export function intoNativeCircleOptions(options: CircleOptions) {
	const opts = new com.google.android.gms.maps.model.CircleOptions();

	if (typeof options?.radius === 'number') {
		opts.radius(options.radius);
	}

	const strokeColor = intoNativeColor(options?.strokeColor);

	if (strokeColor !== null) {
		opts.strokeColor(strokeColor)
	}

	const fillColor = intoNativeColor(options?.fillColor);

	if (fillColor !== null) {
		opts.fillColor(fillColor);
	}

	if (typeof options?.tappable === 'boolean') {
		opts.clickable(options.tappable);
	}

	if (typeof options?.strokeWidth === 'number') {
		opts.strokeWidth(
			Utils.layout.toDevicePixels(options.strokeWidth)
		)
	}

	if (options?.center) {
		opts.center(
			new com.google.android.gms.maps.model.LatLng(options.center.lat, options.center.lng)
		)
	}

	if (Array.isArray(options.strokePattern)) {
		const list = new java.util.ArrayList();
		options.strokePattern.forEach(item => {
			list.add(item.native)
		});
		opts.strokePattern(list);
	}


	if (typeof options?.zIndex === 'number') {
		opts.zIndex(options.zIndex);
	}
	return opts;
}

export function intoNativePolygonOptions(options: PolygonOptions) {
	const opts = new com.google.android.gms.maps.model.PolygonOptions();

	if (Array.isArray(options?.points)) {
		options.points.forEach(point => {
			opts.add(new com.google.android.gms.maps.model.LatLng(
				point.lat,
				point.lng
			))
		})
	}

	if (Array.isArray(options?.holes)) {
		const holes = new java.util.ArrayList();
		options.holes.forEach(hole => {
			holes.add(new com.google.android.gms.maps.model.LatLng(
				hole.lat,
				hole.lng
			))
		});

		if (options.holes.length) {
			opts.addHole(holes)
		}
	}

	if (typeof options?.tappable === 'boolean') {
		opts.clickable(options.tappable)
	}

	const strokeColor = intoNativeColor(options?.strokeColor);

	if (strokeColor !== null) {
		opts.strokeColor(strokeColor)
	}

	const fillColor = intoNativeColor(options?.fillColor);

	if (fillColor !== null) {
		opts.fillColor(fillColor);
	}

	if (typeof options?.strokeWidth === 'number') {
		opts.strokeWidth(
			Utils.layout.toDevicePixels(options.strokeWidth)
		)
	}

	if (typeof options?.geodesic === 'boolean') {
		opts.geodesic(options.geodesic)
	}

	if (options?.strokeJointType) {
		opts.strokeJointType(intoNativeJointType(options.strokeJointType));
	}

	if (Array.isArray(options.strokePattern)) {
		const list = new java.util.ArrayList();
		options.strokePattern.forEach(item => {
			list.add(item.native)
		});
		opts.strokePattern(list);
	}


	if (typeof options?.zIndex === 'number') {
		opts.zIndex(options.zIndex);
	}
	return opts;
}

export function intoNativePolylineOptions(options: PolylineOptions) {
	const opts = new com.google.android.gms.maps.model.PolylineOptions();

	if (typeof options?.width === 'number') {
		opts.width(Utils.layout.toDevicePixels(options.width));
	}

	if (Array.isArray(options?.points)) {
		options.points.forEach(point => {
			opts.add(new com.google.android.gms.maps.model.LatLng(
				point.lat,
				point.lng
			))
		})
	}


	if (typeof options?.tappable === 'boolean') {
		opts.clickable(options.tappable)
	}

	const color = intoNativeColor(options?.color);

	if (color !== null) {
		opts.color(color)
	}


	if (typeof options?.geodesic === 'boolean') {
		opts.geodesic(options.geodesic)
	}

	if (options?.jointType) {
		opts.jointType(intoNativeJointType(options.jointType));
	}

	if (Array.isArray(options.pattern)) {
		const list = new java.util.ArrayList();
		options.pattern.forEach(item => {
			list.add(item.native)
		});
		opts.pattern(list);
	}

	if (typeof options?.zIndex === 'number') {
		opts.zIndex(options.zIndex);
	}


	if (typeof options?.startCap) {
		opts.startCap(options.startCap.native);
	}

	if (typeof options?.endCap) {
		opts.endCap(options.endCap.native);
	}
	return opts;
}

export function intoNativeGroundOverlayOptions(options: GroundOverlayOptions) {
	const opts = new com.google.android.gms.maps.model.GroundOverlayOptions();

	if (typeof options?.width === 'number') {
		opts.position(
			opts.getLocation(), options.width
		);
	}

	if (typeof options?.height === 'number') {
		opts.position(
			opts.getLocation(), opts.getWidth(), options.height
		);
	}

	if (typeof options?.transparency) {
		opts.transparency(options.transparency);
	}

	if (typeof options?.anchorU === 'number' || typeof options?.anchorV === 'number') {
		opts.anchor(
			options?.anchorU ?? opts.getAnchorU(),
			options?.anchorV ?? opts.getAnchorV(),
		);
	}


	if (typeof options?.tappable === 'boolean') {
		opts.clickable(options.tappable)
	}


	if (options?.position) {
		const coords = (<Coordinate>options.position);
		opts.position(new com.google.android.gms.maps.model.LatLng(
			coords.lat,
			coords.lng
		), opts.getWidth());
	}


	if (typeof options?.tappable === 'boolean') {
		opts.clickable(options.tappable);
	}


	if (typeof options?.bearing === 'number') {
		opts.bearing(options.bearing)
	}

	if (options?.image instanceof android.graphics.Bitmap) {
		opts.image(com.google.android.gms.maps.model.BitmapDescriptorFactory.fromBitmap(options?.image));
	} else if (options?.image instanceof ImageSource) {
		opts.image(com.google.android.gms.maps.model.BitmapDescriptorFactory.fromBitmap(options?.image.android));
	}


	if (typeof options?.zIndex === 'number') {
		opts.zIndex(options.zIndex);
	}

	return opts;
}

export function intoNativeTileOverlayOptions(options: TileOverlayOptions) {
	const opts = new com.google.android.gms.maps.model.TileOverlayOptions();

	if (typeof options?.fadeIn === 'boolean') {
		opts.fadeIn(options.fadeIn)
	}

	if (typeof options?.transparency === 'number') {
		opts.transparency(options.transparency)
	}


	if (typeof options?.visible === 'number') {
		opts.visible(options.visible)
	}

	if (options?.tileProvider) {
		opts.tileProvider(options.tileProvider.native)
	}

	if (options?.zIndex) {
		opts.zIndex(options.zIndex);
	}

	return opts;
}